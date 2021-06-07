import { BufferGeometry } from 'three';

export abstract class AbstractGeometry<T extends BufferGeometry> {
  protected object: T;
  public get getObject(): T {
    return this.object;
  }
}