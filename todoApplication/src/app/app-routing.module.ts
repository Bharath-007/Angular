import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./authentication/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./authentication/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'todo/:userId',
    loadChildren: () =>
      import('./layout/tasks/tasks.module').then((m) => m.TasksModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'addTask',
    loadChildren: () =>
      import('./layout/add-task/add-task.module').then((m) => m.AddTaskModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
