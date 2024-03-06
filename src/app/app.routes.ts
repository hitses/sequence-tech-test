import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'songs', loadChildren: () => import('./songs/songs.routes') },
  { path: '**', redirectTo: 'songs' },
];
