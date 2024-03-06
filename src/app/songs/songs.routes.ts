import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./songs.component'),
    children: [
      {
        path: 'add',
        pathMatch: 'full',
        loadComponent: () => import('./pages/add-song/add-song.component'),
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/song/song.component'),
      },
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/songs-list/songs-list.component'),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

export default routes;
