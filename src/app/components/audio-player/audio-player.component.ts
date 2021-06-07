import { Component, Renderer2, ElementRef, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { WINDOW, WindowProvider } from 'src/app/services/window.service'

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  providers: [ WindowProvider ]
})

export class AudioPlayerComponent implements AfterViewInit {
  // Elements
  @ViewChild('canvas', { static: true }) 
    canvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('audio', { static: false })
    player: ElementRef<HTMLDivElement>;

  audio: HTMLAudioElement;

  // Audio
  context: AudioContext;
  analyser: AnalyserNode;
  source: MediaElementAudioSourceNode;

  // Canvas
  ctx: CanvasRenderingContext2D;
	fbc_array;
	bar_count;
	bar_pos;
	bar_width: number;
	bar_height: number;

  constructor(
    @Inject(WINDOW) private window: Window,
    private renderer: Renderer2
  ) { }

  start(): void {
    /* SETUP */
    // Audio config
    this.audio = new Audio();
    this.audio.src = "assets/test.mp3";
    this.audio.controls = true;
    this.audio.loop = false;
    this.audio.autoplay = false;

    this.context = new AudioContext();
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.analyser = this.context.createAnalyser();
    this.source = this.context.createMediaElementSource(this.audio);

    // Connections
    this.analyser.connect(this.context.destination);
    this.source.connect(this.analyser);

    // DOM
    this.renderer.appendChild(this.player.nativeElement, this.audio);
		this.canvas.nativeElement.width = 600;
		this.canvas.nativeElement.height = 300;

    // Run loop
    this.window.addEventListener(
      'load',
      () => this.FrameLooper(),
      false
    )
  }

  ngAfterViewInit(): void {

  }

  /**
   * Queries active frequencies of audio stream and outputs to canvas
   */
  FrameLooper(): void {
	  this.fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
	  this.bar_count = this.window.innerWidth / 4;
	  this.analyser.getByteFrequencyData(this.fbc_array);
	  this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    for (var i = 0; i < this.bar_count; i++) {
      if (this.fbc_array[i] < 51) {
        this.ctx.fillStyle = "#94000A"
      } else if (this.fbc_array[i] < 102) {
        this.ctx.fillStyle = "#FF940E"
      } else if (this.fbc_array[i] < 153) {
        this.ctx.fillStyle = "#FFD82B"
      } else if (this.fbc_array[i] < 204) {
        this.ctx.fillStyle = "#D1FFE2"
      } else {
        this.ctx.fillStyle = "#ffffff";
      }
      this.bar_pos = i * 4;
      this.bar_width = 2;
      this.bar_height = -(this.fbc_array[i] / 1.25);
      this.ctx.fillRect(this.bar_pos, this.canvas.nativeElement.height, this.bar_width, this.bar_height);
    }
    setTimeout(() => {
      this.FrameLooper();
    }, 20);
  }
}
