import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { Observable, switchMap, tap } from 'rxjs';

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

  getArtistById(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.url}/artists/${id}`).pipe(
      tap((data: Artist) => {
        this.artist.set(data);
      })
    );
  }

  addSongToArtist(artistId: number, songId: number) {
    return this.getArtistById(artistId).pipe(
      switchMap(() => {
        this.artist.update((artist) => {
          artist.songs.push(songId);
          return artist;
        });

        return this.http
          .put(`${this.url}/artists/${artistId}`, this.artist())
          .pipe(
            tap(() => {
              this.getArtists();
            })
          );
      })
    );
  }
}
