import { Component, inject } from '@angular/core';
import { SongsService } from '../../../shared/services/songs.service';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss',
})
export default class SongComponent {
  private route = inject(ActivatedRoute);
  private readonly songsService = inject(SongsService);

  song = this.songsService.song;

  constructor() {
    this.route.params
      .pipe(switchMap(async ({ id }) => this.songsService.getSongById(id)))
      .subscribe();
  }
}
