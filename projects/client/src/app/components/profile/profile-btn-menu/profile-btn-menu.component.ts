import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../features/auth/auth.service';

@Component({
  selector: 'app-profile-btn-menu',
  templateUrl: './profile-btn-menu.component.html',
  styleUrls: ['./profile-btn-menu.component.scss'],
})
export class ProfileBtnMenuComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    this.router.navigate(['/auth']);
  }
}
