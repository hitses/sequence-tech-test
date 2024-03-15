import { Component, inject } from '@angular/core';

import { SongCardComponent } from '@app/songs/components/song-card/song-card.component';

import { SongsService } from '@app/shared/services/songs.service';
import { ArtistsService } from '@app/shared/services/artists.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { HeaderService } from '@app/shared/services/header.service';
import { SideMenuComponent } from '@app/shared/components/side-menu/side-menu.component';
import { SideMenuService } from '@app/shared/services/side-menu.service';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [
    SongCardComponent,
    RouterLink,
    HeaderComponent,
    SideMenuComponent,
    TranslateModule,
    LoaderComponent,
  ],
  templateUrl: './songs-list.component.html',
  styleUrl: './songs-list.component.scss',
})
export default class SongsListComponent {
  private readonly songsService = inject(SongsService);
  private readonly artistsService = inject(ArtistsService);
  private readonly headerService = inject(HeaderService);
  private readonly sideMenuService = inject(SideMenuService);

  songs = this.songsService.songs;
  artists = this.artistsService.artists;

  ngOnInit() {
    this.headerService.headerAction.subscribe((action) => {
      if (action === 'menu') {
        this.openMenu();
      }
    });
  }

  getArtistName(id: number): string {
    const artist = this.artists().find((artist) => artist.id === id);
    return artist ? artist.name : '';
  }

  openMenu() {
    this.sideMenuService.openMenu();
  }
}
