import { Camera } from 'three';
import { AbstractObject3D } from './abstract-object-3d';

export abstract class AbstractCamera<T extends Camera> extends AbstractObject3D<T> {
  abstract updateAspectRatio( aspect: number ): void;
}