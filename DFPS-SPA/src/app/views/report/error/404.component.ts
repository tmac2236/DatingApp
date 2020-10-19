import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: '404.component.html'
})
export class P404Component implements OnInit{

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('Hello');
    setInterval(() => {
      this.redirtct();
    }, 5000);
  }
  redirtct(){
    this.router.navigate(['/report/attendanceList']);
  }
}
