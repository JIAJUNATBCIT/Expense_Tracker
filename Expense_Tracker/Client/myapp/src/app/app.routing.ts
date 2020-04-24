import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { PageAComponent }        from './app.page-a';
import { PageBComponent }        from './app.page-b';
import { PageDefault }           from './app.pagedefault';

const appRoutes: Routes = [
  { path: 'Expense/Create', component: PageAComponent },
  { path: 'Expense/Index', component: PageBComponent },
  { path: '', redirectTo: '/Expense/Create', pathMatch: 'full' },
  { path: '**', component: PageDefault }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
