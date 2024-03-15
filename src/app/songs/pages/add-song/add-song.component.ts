import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ArtistsService } from '@app/shared/services/artists.service';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { HeaderService } from '@app/shared/services/header.service';
import { SongsService } from '@app/shared/services/songs.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';
import { Song } from '@app/shared/models/song.interface';

@Component({
  selector: 'app-add-song',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    TitleCasePipe,
    HeaderComponent,
    TranslateModule,
    LoaderComponent,
  ],
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.scss',
})
export default class AddSongComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly songsService = inject(SongsService);
  private readonly artistsService = inject(ArtistsService);
  private readonly headerService = inject(HeaderService);
  private readonly toastr = inject(ToastrService);
  private translate = inject(TranslateService);

  artists = this.artistsService.artists;
  currentYear = signal<number>(new Date().getFullYear());

  addSongForm: FormGroup;

  constructor() {
    this.addSongForm = this.fb.group({
      title: [
        ,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      artist: [, [Validators.required, Validators.min(0)]],
      genre: [
        ,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(250),
        ],
      ],
      year: [
        ,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(this.currentYear()),
        ],
      ],
      duration: [
        ,
        [Validators.required, Validators.min(0), Validators.max(3600)],
      ],
      rating: [, [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }

  ngOnInit() {
    this.headerService.headerAction.subscribe();
  }

  validField(field: string) {
    return (
      this.addSongForm.controls[field].errors &&
      this.addSongForm.controls[field].touched
    );
  }

  addSong() {
    if (this.addSongForm.invalid) {
      this.addSongForm.markAllAsTouched();
      return;
    }

    const song = this.addSongForm.value;

    song.poster = 'http://dummyimage.com/400x600.png/cc0000/ffffff';

    song.genre = song.genre.split(',');
    song.genre = song.genre.map((genre: string) =>
      genre.trim().toLocaleLowerCase()
    );

    song.artist = Number(song.artist);

    this.translate
      .get(['songs.addSong.toast.message'], { song: song.title })
      .subscribe((translations) => {
        this.songsService.addSong(song).subscribe({
          next: (song: Song) => {
            this.artistsService
              .addSongToArtist(song.artist, song.id)
              .subscribe();

            this.toastr.success(translations['songs.addSong.toast.message']);
            this.router.navigate(['songs']);
          },
          error: (error) => {
            console.error(error);
          },
        });
      });
  }
}
