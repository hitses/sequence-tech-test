import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./songs.component'),
    children: [
      {
        path: 'add',
        pathMatch: 'full',
        loadComponent: () => import('./add-song/add-song.component'),
      },
      {
        path: ':id',
        loadComponent: () => import('./song/song.component'),
      },
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./songs-list/songs-list.component'),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

export default routes;
