import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/_models/attendance';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ReportService } from 'src/app/_services/report.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss'],
})
export class AttendanceListComponent implements OnInit {
  attendance: Attendance[];

  constructor(
    private http: HttpClient,
    private reportService: ReportService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.d4Search();
  }
  d4Search() {
    this.reportService.getAttendances().subscribe(
      (res) => {
        this.attendance = res;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
