import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Utility } from 'src/app/utility/utility';
import { Attendance } from 'src/app/_models/attendance';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ReportService } from 'src/app/_services/report.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss'],
})
export class AttendanceListComponent implements OnInit {

  attendance: Attendance[];
  pagination: Pagination;

  constructor(
    private utility: Utility,
    private reportService: ReportService,
  ) {}

  ngOnInit() {
    this.pagination ={
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 0
    };

    this.d4Search();
  }
  pageChangeds(event: any): void{
    this.pagination.currentPage = event.page;
    this.d4Search();
  }
  d4Search() {
    this.utility.spinner.show();
    this.reportService.getAttendances( this.pagination.currentPage, this.pagination.itemsPerPage ).subscribe(
      (res: PaginatedResult<Attendance[]>) => {
        this.attendance = res.result;
        this.pagination = res.pagination;
        this.utility.spinner.hide();
      },
      (error) => {
        this.utility.spinner.hide();
        this.utility.alertify.error(error);
      }
    );
  }
  export() {
    this.utility.spinner.show();
    this.utility.http.get(
      this.utility.baseUrl + 'report/exportGetAttendanceList'
       ,
      { responseType: 'blob' })
      .subscribe((result: Blob) =>{
        if (result.type !== 'application/xlsx') {
          alert(result.type);
          this.utility.spinner.hide();
        }
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentTime = new Date();
        const filename = 'Excel_GetAttendanceList_' + currentTime.getFullYear().toString() +
          (currentTime.getMonth() + 1) + currentTime.getDate() +
          currentTime.toLocaleTimeString().replace(/[ ]|[,]|[:]/g, '').trim() + '.xlsx';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        this.utility.spinner.hide();
      }
    );
  }
}
