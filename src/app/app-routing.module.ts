import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumComponent } from './album/album.component';

const routes: Routes = [
  { path: 'album', component: AlbumComponent },
  { path: '', redirectTo: '/album', pathMatch: 'full' },
  { path: '**', redirectTo: '/album', pathMatch: 'full' }
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
