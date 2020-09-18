import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Utility } from 'src/app/utility/utility';
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
    private utility: Utility,
    private reportService: ReportService,
  ) {}

  ngOnInit() {
    this.d4Search();
  }
  d4Search() {
    this.utility.spinner.show();
    this.reportService.getAttendances().subscribe(
      (res) => {
        this.attendance = res;
        this.utility.spinner.hide();
      },
      (error) => {
        this.utility.spinner.hide();
        this.utility.alertify.error(error);
      }
    );
  }
}
