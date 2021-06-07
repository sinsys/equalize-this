import { Directive, AfterViewInit, forwardRef, ContentChild, Input } from '@angular/core';
import { Mesh, MeshStandardMaterial, MeshBasicMaterial, Vector3 } from 'three';
import { AbstractObject3D } from './abstract-object-3d';
import { AbstractMaterial } from './abstract-material';
import { AbstractGeometry } from './abstract-geometry';

@Directive({
  selector: 'three-mesh',
  providers: [
    {
      provide: AbstractObject3D,
      useExisting: forwardRef(() => MeshDirective )
    }
  ]
})

export class MeshDirective extends AbstractObject3D<Mesh> implements AfterViewInit {
  @ContentChild( AbstractGeometry ) geometry: AbstractGeometry<any>;
  @ContentChild( AbstractMaterial ) material: AbstractMaterial<any>;

  ngAfterViewInit() {
    this.object = new Mesh(
      this.geometry.getObject(),
      this.material && this.material.getObject ||
        new MeshStandardMaterial({ color: 0x000000 })
    ),
    super.ngAfterViewInit();
  }
}