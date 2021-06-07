import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';

const routes: Routes = [
  { path: '', component: AudioPlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
