import { Material } from 'three';

export abstract class AbstractMaterial<T extends Material> {
  protected object: T;
  public get getObject(): T {
    return this.object;
  }
}