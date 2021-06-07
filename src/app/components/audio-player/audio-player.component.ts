import { Component, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('audio', { static: false })
  player: ElementRef<HTMLDivElement>;

  audio: HTMLAudioElement = new Audio();
	ctx;
	source;
	context;
	analyser;
	fbc_array;
	bar_count;
	bar_pos;
	bar_width;
	bar_height;

  constructor(
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.createPlayer();
  }

  createPlayer(): void {
    this.audio.src = "assets/test.mp3";
    this.audio.controls = true;
    this.audio.loop = false;
    this.audio.autoplay = false;
    this.renderer.appendChild(this.player.nativeElement, this.audio);
  }
}
