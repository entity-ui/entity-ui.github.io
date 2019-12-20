import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntityViewAboutContainerComponent } from './containers/entity-view-about-container/entity-view-about-container.component';

const routes: Routes = [
  {
    path: '',
    component: EntityViewAboutContainerComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
