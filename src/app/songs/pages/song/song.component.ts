import { Component, inject } from '@angular/core';
import { SongsService } from '../../../shared/services/songs.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { HeaderService } from '@app/shared/services/header.service';
import { Song } from '@app/shared/models/song.interface';

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
  private readonly headerService = inject(HeaderService);

  song = this.songsService.song;

  constructor() {
    this.route.params
      .pipe(switchMap(async ({ id }) => this.songsService.getSongById(id)))
      .subscribe();
  }

  ngOnInit() {
    this.headerService.headerAction.subscribe();
  }

  ngOnDestroy() {
    this.song.set({} as Song);
  }
}
