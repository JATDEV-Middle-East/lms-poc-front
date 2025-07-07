import { Component, Input } from '@angular/core';
import { IUserData } from '../../interfaces/iUser';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
    @Input() authUser!: IUserData;
}
