import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArtistsService } from '@app/shared/artists.service';

@Component({
  selector: 'app-add-song',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, TitleCasePipe],
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.scss',
})
export default class AddSongComponent {
  private fb = inject(FormBuilder);
  private readonly artistsService = inject(ArtistsService);

  artists = this.artistsService.artists;

  addSongForm: FormGroup;

  constructor() {
    this.addSongForm = this.fb.group({
      name: [
        ,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      artist: [
        ,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      genre: [
        ,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(250),
        ],
      ],
      country: [
        ,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      year: [
        ,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      duration: [
        ,
        [Validators.required, Validators.min(0), Validators.max(3600)],
      ],
      rating: [, [Validators.required, Validators.min(0), Validators.max(10)]],
    });
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

    console.log(song);
  }
}
