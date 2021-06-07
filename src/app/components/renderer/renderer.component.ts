import { AfterViewInit, Component,  Input, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { Color, WebGLRenderer } from 'three';
import { SceneDirective } from 'src/app/three/scene.directive'
import { AbstractCamera } from 'src/app/three/abstract-camera'

@Component({
  selector: 'three-renderer',
  template: '<canvas #canvas></canvas>',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements AfterViewInit {
  @ViewChild( 'canvas' )
    canvasReference: ElementRef;

  get canvas(): HTMLCanvasElement {
    return this.canvasReference.nativeElement;
  }

  @ContentChild( SceneDirective ) scene: SceneDirective;
  @ContentChild( AbstractCamera ) camera: AbstractCamera<any>;

  @Input() color: string | number | Color = 0xffffff;
  @Input() alpha = 0;

  renderer: any;
  constructor() { }

  ngAfterViewInit(): void {
    this.renderer = new WebGLRenderer(
      {
        canvas: this.canvas,
        antialias: true,
        alpha: true
      }
    );
    this.renderer.setPixelRatio( devicePixelRatio );
    this.renderer.setClearColor( this.color, this.alpha );
    this.renderer.autoClear = true;
  }

  render() {
    this.renderer.render(
      this.scene.object,
      this.camera.object
    );
  }
}
