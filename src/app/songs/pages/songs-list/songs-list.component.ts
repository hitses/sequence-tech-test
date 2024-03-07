import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { SongCardComponent } from '@app/songs/components/song-card/song-card.component';

import { SongsService } from '@app/shared/songs.service';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [SongCardComponent],
  templateUrl: './songs-list.component.html',
  styleUrl: './songs-list.component.scss',
})
export default class SongsListComponent {
  private readonly songsService = inject(SongsService);

  songs = this.songsService.songs;
}
