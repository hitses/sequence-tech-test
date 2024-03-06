import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss',
})
export default class SongsComponent {}
