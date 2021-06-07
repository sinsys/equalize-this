import { Directive, AfterViewInit, Input, forwardRef } from '@angular/core';
import { SphereBufferGeometry } from 'three';
import { AbstractGeometry } from './abstract-geometry';

@Directive({
  selector: 'three-sphere-buffer-geometry',
  providers: [
    {
      provide: AbstractGeometry,
      useExisting: forwardRef(() => SphereBufferGeometryDirective )
    }
  ]
})

export class SphereBufferGeometryDirective extends AbstractGeometry<SphereBufferGeometry> implements AfterViewInit {
  // some inputs for the sake of example
  @Input() radius = 1;
  @Input() widthSegments = 16;
  @Input() heightSegments = 16;
  ngAfterViewInit() {
    this.object = new SphereBufferGeometry
    (
      this.radius,
      this.widthSegments,
      this.heightSegments,
    );
  }
}