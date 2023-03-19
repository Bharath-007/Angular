import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsModule } from './user-details/user-details.module';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./user-details/user-details.module').then(
        (m) => m.UserDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
