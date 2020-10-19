import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/_models/user';
import { UserService } from 'src/app/core/_services/user.service';
import { AlertifyService } from 'src/app/core/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memeber-list',
  templateUrl: './memeber-list.component.html',
  styleUrls: ['./memeber-list.component.css'],
})
export class MemeberListComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.users = data['users'];
    });
  }
}
