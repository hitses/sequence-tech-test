import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '@app/shared/services/header.service';
import { SongsService } from '@app/shared/services/songs.service';
import { ArtistsService } from '../../services/artists.service';

@Component({
  selector: 'header-component',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly songsService = inject(SongsService);
  private readonly artistsService = inject(ArtistsService);
  private readonly headerService = inject(HeaderService);

  icon = input.required<string>();
  title = input.required<string>();

  onClickIcon() {
    if (this.title() === 'Canciones') {
      this.headerService.performAction('menu');
    } else if (
      this.title() ===
        this.songsService.song().title +
          ' (' +
          this.artistsService.artist().name +
          ')' ||
      this.title() === 'Nueva canción'
    ) {
      this.headerService.performAction('');
      this.router.navigate(['songs']);
    }
  }
}
