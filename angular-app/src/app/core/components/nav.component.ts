import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../model/user-info';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="menu">
      <p class="menu-label">Menu</p>
      <ul class="menu-list">
        <a routerLink="/products" routerLinkActive="router-link-active">
          <span>Products</span>
        </a>
        <a routerLink="/about" routerLinkActive="router-link-active">
          <span>About</span>
        </a>
      </ul>
    </nav>
    <nav class="menu auth">
      <p class="menu-label">Auth</p>
      <div class="menu-list auth">
        <ng-container *ngIf="!userInfo; else logout">
          <ng-container *ngFor="let provider of providers">
            <a href="/.auth/login/{{provider}}?post_login_redirect_uri={{redirect}}">{{provider}}</a>
          </ng-container>
        </ng-container>
        <ng-template #logout>
          <a href="/.auth/logout?post_logout_redirect_uri={{redirect}}">Logout</a>
        </ng-template>
      </div>
    </nav>
    <div class="user" *ngIf="userInfo">
      <p>Welcome</p>
      <p>{{ userInfo?.userDetails }}</p>
      <p>{{ userInfo?.identityProvider }}</p>
    </div>
  `,
})
export class NavComponent implements OnInit {
  providers = ['twitter', 'github', 'aad'];
  redirect = window.location.pathname;
  userInfo: UserInfo;

  async ngOnInit() {
    this.userInfo = await this.getUserInfo();
  }

  async getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }
}
