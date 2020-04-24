import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    template:   
      `<div><img style='vertical-align:middle;' src='../assets/logo.png'><label class="title">  Expense Tracker</label></div><br/>
      <nav style="height:20px">
      <a routerLink="/Expense/Create" routerLinkActive="active">Create Expense</a> |
      <a routerLink="/Expense/Index" routerLinkActive="active">My Expenses</a>
      </nav>
      <!-- Where router should display a view -->
      <router-outlet></router-outlet>`
})
export class AppComponent { }
