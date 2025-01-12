import { forwardRef, MutableRefObject, useEffect, useState } from 'react';
import { combinedShaders } from './shaders/combinedShaders.ts';
import { combinedAttributes } from './attributes/combinedAttributes.ts';
import { HandleFrameAnimation } from './utils/HandleFrameAnimation.ts';
import { useThree } from '@react-three/fiber';
import { BufferGeometry } from 'three';

export const Particles = forwardRef<BufferGeometry, unknown>((_, ref) => {
    const [animationState, setAnimationState] = useState(combinedAttributes);
    const { gl } = useThree();

    // Handle dynamic updates when ref or animation state changes
    useEffect(() => {
        if (typeof ref === 'function' || !ref || !(
            ref as MutableRefObject<BufferGeometry>).current) {
            return;
        }

        const geometry = (ref as MutableRefObject<BufferGeometry>).current;

        const newAnimationState = combinedAttributes();

        // Update position
        geometry.attributes.position.array.set(newAnimationState.positions);
        geometry.attributes.position.needsUpdate = true;

        // Update color
        geometry.attributes.color.array.set(newAnimationState.colors);
        geometry.attributes.color.needsUpdate = true;

        // Update size
        geometry.attributes.size.array.set(newAnimationState.sizes);
        geometry.attributes.size.needsUpdate = true;

        // Update opacity
        geometry.attributes.opacity.array.set(newAnimationState.opacities);
        geometry.attributes.opacity.needsUpdate = true;

        setAnimationState(newAnimationState);
    }, [ref]);

    // Handle window resizing
    useEffect(() => {
        const handleResize = () => {
            const pixelRatio = Math.min(window.devicePixelRatio, 10);
            gl.setPixelRatio(pixelRatio);
            gl.setSize(window.innerWidth, window.innerHeight);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [gl]);

    // HMR handler for updating animation state
    useEffect(() => {
        if (import.meta.hot) {
            import.meta.hot.accept(() => {
                // Regenerate animation state when HMR triggers
                const newAnimationState = combinedAttributes();
                setAnimationState(newAnimationState);
            });
        }
    }, []);


    // Frame-by-frame animation logic
    HandleFrameAnimation(
        ref as MutableRefObject<BufferGeometry>,
        animationState.oscillatingIndices,
        animationState.positions
    );

    return (
        <points>
            <bufferGeometry ref={ref}>
                <bufferAttribute
                    attach="attributes-position"
                    array={animationState.positions}
                    itemSize={3}
                    count={animationState.positions.length / 3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    array={animationState.colors}
                    itemSize={3}
                    count={animationState.colors.length / 3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    array={animationState.sizes}
                    itemSize={1}
                    count={animationState.sizes.length}
                />
                <bufferAttribute
                    attach="attributes-opacity"
                    array={animationState.opacities}
                    itemSize={1}
                    count={animationState.opacities.length}
                />
            </bufferGeometry>
            <primitive object={combinedShaders()} attach="material" />
        </points>
    );
});
