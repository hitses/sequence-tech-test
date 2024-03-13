import { Component, inject } from '@angular/core';

import { SongCardComponent } from '@app/songs/components/song-card/song-card.component';

import { SongsService } from '@app/shared/songs.service';
import { ArtistsService } from '@app/shared/artists.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [SongCardComponent, RouterLink],
  templateUrl: './songs-list.component.html',
  styleUrl: './songs-list.component.scss',
})
export default class SongsListComponent {
  private readonly songsService = inject(SongsService);
  private readonly artistsService = inject(ArtistsService);

  songs = this.songsService.songs;
  artists = this.artistsService.artists;

  getArtistName(id: number): string {
    const artist = this.artists().find((artist) => artist.id === id);
    return artist ? artist.name : '';
  }
}
