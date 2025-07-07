import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router'; 
import { AuthService } from '../../services/auth.service'; 
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavComponent } from '../nav/nav.component';
import { IUserData } from '../../interfaces/iUser';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SidebarComponent, NavComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  authUser: IUserData | null = null;

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.fetchConstants();
  }

  
  logout(): void {
    this.authService.logout();
  }
  fetchConstants() : void {
    this.authUser = this.authService.getCurrentUserFromToken()
  }
}