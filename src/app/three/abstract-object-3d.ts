import { Directive, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { Object3D } from 'three';

@Directive()
export abstract class AbstractObject3D<T extends Object3D> implements AfterViewInit {
  protected object: T;

  @ContentChildren( AbstractObject3D, { descendants: true } ) 
    childNodes: QueryList<AbstractObject3D<any>>;

  ngAfterViewInit() {
    if ( this.childNodes !== undefined && this.childNodes.length > 1 )
      this.object.add( ...this.childNodes
        // filter out self and unset objects
        .filter( node => node !== this && node.object !== undefined )
        .map( ( { object } ) => object ) );
  }
}