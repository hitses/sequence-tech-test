import { Component, inject } from '@angular/core';
import { SongsService } from '../../../shared/services/songs.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { HeaderService } from '@app/shared/services/header.service';
import { Song } from '@app/shared/models/song.interface';
import { ArtistsService } from '@app/shared/services/artists.service';
import { Artist } from '@app/shared/models/artist.interface';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss',
})
export default class SongComponent {
  private route = inject(ActivatedRoute);
  private readonly songsService = inject(SongsService);
  private readonly artistsService = inject(ArtistsService);
  private readonly headerService = inject(HeaderService);

  song = this.songsService.song;
  artist = this.artistsService.artist;

  constructor() {
    this.route.params
      .pipe(
        switchMap(async ({ id }) => {
          this.songsService.getSongAndArtistById(id);
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.headerService.headerAction.subscribe();
  }

  ngOnDestroy() {
    this.song.set({} as Song);
    this.artist.set({} as Artist);
  }

  convertToMinutes(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}
