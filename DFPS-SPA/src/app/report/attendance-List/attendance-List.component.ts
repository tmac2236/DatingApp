import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Utility } from 'src/app/utility/utility';
import { Attendance } from 'src/app/_models/attendance';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { SAttendance } from 'src/app/_models/s_attendance';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ReportService } from 'src/app/_services/report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss'],
})
export class AttendanceListComponent implements OnInit {
  attendance: Attendance[];
  sAttendance: SAttendance = new SAttendance();

  constructor(private utility: Utility, private reportService: ReportService, private router: Router) {}

  ngOnInit() {
    // this.sAttendance.isPaging = true;
    this.d4Search();
  }
  pageChangeds(event: any): void {
    this.sAttendance.currentPage = event.page;
    this.d4Search();
  }
  d4Search() {
    this.utility.spinner.show();
    this.reportService.getAttendances(this.sAttendance).subscribe(
      (res: PaginatedResult<Attendance[]>) => {
        this.attendance = res.result;
        this.sAttendance.setPagination(res.pagination);
        this.utility.spinner.hide();
      },
      (error) => {
        this.utility.spinner.hide();
        let is500 = error.includes('(Http500)');
        this.router.navigate(['P500']);
        this.utility.alertify.error(error);
      }
    );
  }
  export() {
    this.utility.spinner.show();
    this.utility.http
      .get(this.utility.baseUrl + 'report/exportGetAttendanceList', {
        responseType: 'blob',
      })
      .subscribe((result: Blob) => {
        if (result.type !== 'application/xlsx') {
          alert(result.type);
          this.utility.spinner.hide();
        }
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentTime = new Date();
        const filename =
          'Excel_GetAttendanceList_' +
          currentTime.getFullYear().toString() +
          (currentTime.getMonth() + 1) +
          currentTime.getDate() +
          currentTime
            .toLocaleTimeString()
            .replace(/[ ]|[,]|[:]/g, '')
            .trim() +
          '.xlsx';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        this.utility.spinner.hide();
      });
  }
}
