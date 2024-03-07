import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { environment } from '@env/environment';

import { Song } from '@app/songs/models/song.interface';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SongsService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl;

  songs = signal<Song[]>([]);

  constructor() {
    this.getSongs();
  }

  getSongs() {
    this.http
      .get<Song[]>(`${this.url}/songs`)
      .pipe(
        tap((data: Song[]) => {
          this.songs.set(data);
        })
      )
      .subscribe();
  }

  getSongById(id: number) {
    return this.http.get<Song>(`${this.url}/songs/${id}`);
  }
}
