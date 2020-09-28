import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isVisible: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.logoutSubject.subscribe(res => {
      this.isVisible = res;
    })

    if(localStorage.getItem('token'))
      this.isVisible = true;
    else
      this.isVisible =false;
  }

  onLogout() {
    this.authService.logout();
    this.isVisible = false
  }
}
