import { Routes } from '@angular/router';
import { Files } from '../features/files/files';

export const routes: Routes = [
  { path: 'files',
    loadComponent: () => import('../features/files/files').then(m => m.Files)
  }
];
