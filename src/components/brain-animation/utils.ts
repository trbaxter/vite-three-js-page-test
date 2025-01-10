import { data } from '../../utils/brain-animation/data';
import { CatmullRomCurve3, Vector3 } from 'three';

export function createBrainVeinsFromPaths(): CatmullRomCurve3[] {
  const paths = data.economics[0].paths;

  const brainVeins: CatmullRomCurve3[] = [];
  paths.forEach(path => {
    const points: Vector3[] = [];
    for (let i = 0; i < path.length; i += 3) {
      points.push(new Vector3(path[i], path[i + 1], path[i + 2]));
    }
    const tempCurve = new CatmullRomCurve3(points);
    brainVeins.push(tempCurve);
  });

  return brainVeins;
}