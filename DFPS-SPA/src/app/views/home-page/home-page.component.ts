import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AlertifyService } from 'src/app/core/_services/alertify.service';
import { AuthService } from 'src/app/core/_services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class HomePageComponent implements OnInit {
  loginModel: any = {};
  photoUrl: string;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {

  }

  loginSystem() {
    console.log('Hello');
    this.authService.login(this.loginModel).subscribe(
      (next) => {
        this.alertify.success('Logined in sucessed');
        this.router.navigate(['report/getReportDataPass']);
      },
      (error) => {
        this.alertify.error(error);
        this.router.navigate(['']);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['']);
  }
}
