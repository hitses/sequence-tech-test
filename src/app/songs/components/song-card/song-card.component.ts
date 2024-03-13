import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Song } from '@app/shared/models/song.interface';

@Component({
  selector: 'song-card-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss',
})
export class SongCardComponent {
  song = input.required<Song>();
  artist = input.required<string>();
}
