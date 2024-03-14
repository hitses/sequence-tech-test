import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { environment } from '@env/environment';

import { Song } from '@app/shared/models/song.interface';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SongsService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl;

  songs = signal<Song[]>([]);
  song = signal<Song>({} as Song);

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
    this.http
      .get<Song>(`${this.url}/songs/${id}`)
      .pipe(
        tap((data: Song) => {
          this.song.set(data);
        })
      )
      .subscribe();
  }

  addSong(song: Song) {
    return this.http.post<Song>(`${this.url}/songs`, song).pipe(
      tap(() => {
        this.getSongs();
      }),
      catchError((error) => throwError(() => error))
    );
  }
}
