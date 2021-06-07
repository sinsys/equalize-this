import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { RendererComponent } from './components/renderer/renderer.component';
import { AbstractCamera } from './three/abstract-camera';
import { SceneDirective } from './three/scene.directive';
import { PerspectiveCameraDirective } from './three/perspective-camera.directive';
import { SphereBufferGeometryDirective } from './three/sphere-buffer-geometry.directive';

@NgModule({
  declarations: [
    AppComponent,
    AudioPlayerComponent,
    RendererComponent,
    AbstractCamera,
    SceneDirective,
    PerspectiveCameraDirective,
    SphereBufferGeometryDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
