import { BufferGeometry } from 'three';

export function updateGeometry(geometry: BufferGeometry) {
    geometry.attributes.position.needsUpdate = true;
}

