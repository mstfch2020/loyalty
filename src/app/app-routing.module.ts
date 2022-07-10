import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './views/general/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin/main',
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/views/pages/admin/admin.module')
      .then(m => m.AdminModule)//, canLoad: [AuthGuard]
  }, {
    path: 'login',
    loadChildren: () => import('src/app/views/pages/account/account.module')
      .then(m => m.AccountModule)//, canLoad: [AuthGuard]
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, { enableTracing: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule
{
}
