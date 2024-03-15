import { Component, inject } from '@angular/core';
import { SongsService } from '../../../shared/services/songs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { HeaderService } from '@app/shared/services/header.service';
import { Song } from '@app/shared/models/song.interface';
import { ArtistsService } from '@app/shared/services/artists.service';
import { Artist } from '@app/shared/models/artist.interface';
import { CompaniesService } from '@app/shared/services/companies.service';
import { Company } from '@app/shared/models/company.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [HeaderComponent, TranslateModule, LoaderComponent],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss',
})
export default class SongComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly songsService = inject(SongsService);
  private readonly artistsService = inject(ArtistsService);
  private readonly companiesService = inject(CompaniesService);
  private readonly headerService = inject(HeaderService);
  private readonly toastr = inject(ToastrService);
  private translate = inject(TranslateService);

  song = this.songsService.song;
  artist = this.artistsService.artist;
  company = this.companiesService.company;

  constructor() {
    this.route.params
      .pipe(
        switchMap(async ({ id }) => {
          this.songsService.getSongById(id);
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.headerService.headerAction.subscribe();
  }

  ngOnDestroy() {
    this.song.set({} as Song);
    this.artist.set({} as Artist);
    this.company.set({} as Company[]);
  }

  convertToMinutes(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  deleteSong() {
    this.translate
      .get(
        [
          'songs.song.delete.title',
          'songs.song.delete.text',
          'songs.song.delete.confirm',
          'songs.song.delete.cancel',
          'songs.song.delete.toast.message',
        ],
        { song: this.song().title }
      )
      .subscribe((translations) => {
        Swal.fire({
          title: translations['songs.song.delete.title'],
          text: translations['songs.song.delete.text'],
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: translations['songs.song.delete.confirm'],
          cancelButtonText: translations['songs.song.delete.cancel'],
        }).then((result) => {
          if (result.isConfirmed) {
            this.songsService.deleteSongById(this.song().id).subscribe({
              next: () => {
                this.artistsService
                  .deleteSongToArtist(this.song().artist, this.song().id)
                  .subscribe();

                this.toastr.info(
                  translations['songs.song.delete.toast.message']
                );
                this.router.navigate(['songs']);
              },
              error: (error) => {
                console.error(error);
              },
            });
          }
        });
      });
  }
}
