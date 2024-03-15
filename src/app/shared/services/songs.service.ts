import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { environment } from '@env/environment';

import { Song } from '@app/shared/models/song.interface';
import { catchError, tap, throwError } from 'rxjs';
import { ArtistsService } from './artists.service';
import { CompaniesService } from './companies.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class SongsService {
  private readonly http = inject(HttpClient);
  private readonly artistsService = inject(ArtistsService);
  private readonly companiesService = inject(CompaniesService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private translate = inject(TranslateService);
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

          this.artistsService.getArtistById(data.artist).subscribe();
          this.companiesService.getCompanyBySongId(data.id);
        }),
        catchError((error) => throwError(() => error))
      )
      .subscribe({
        next: () => {},
        error: (error) => {
          this.translate
            .get(['songs.song.notFound'])
            .subscribe((translations) => {
              this.toastr.info(translations['songs.song.notFound']);
              if (error.status === 404) this.router.navigate(['songs']);
            });
        },
      });
  }

  addSong(song: Song) {
    return this.http.post<Song>(`${this.url}/songs`, song).pipe(
      tap(() => {
        this.getSongs();
      }),
      catchError((error) => throwError(() => error))
    );
  }

  deleteSongById(id: number) {
    return this.http.delete<Song>(`${this.url}/songs/${id}`).pipe(
      tap(() => {
        this.getSongs();
      }),
      catchError((error) => throwError(() => error))
    );
  }
}
