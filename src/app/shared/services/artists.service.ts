import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { tap } from 'rxjs';

import { environment } from '@env/environment';

import { Artist } from '@app/shared/models/artist.interface';

@Injectable({ providedIn: 'root' })
export class ArtistsService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl;

  artists = signal<Artist[]>([]);
  artist = signal<Artist>({} as Artist);

  constructor() {
    this.getArtists();
  }

  getArtists() {
    this.http
      .get<Artist[]>(`${this.url}/artists`)
      .pipe(
        tap((data: Artist[]) => {
          this.artists.set(data);
        })
      )
      .subscribe();
  }
}
