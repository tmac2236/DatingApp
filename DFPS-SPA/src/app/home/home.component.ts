import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlanWorker } from '../_models/plan-worker';
import { ReportDataPass } from '../_models/report-data-pass';
import { ReportService } from '../_services/report.service';
import { SReportDataPass } from '../_models/s_report-data-pass';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  planWorker: PlanWorker[];
  reportDataPass: ReportDataPass[];
  sReportDataPass = new SReportDataPass();

  constructor(
    private http: HttpClient,
    private reportService: ReportService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    //this.getValues();
  }

  registerToggle() {
    this.registerMode = true;
  }

  getValues() {
    this.http
      .get<ReportDataPass[]>(
        'http://localhost:5000/api/report/getReportDataPass'
      )
      .subscribe(
        (response) => {
          this.reportDataPass = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  search() {
    console.log(this.sReportDataPass);
    this.reportService
      .getReportDataPass(this.sReportDataPass)
      .subscribe((res) => {
        this.reportDataPass = res;
      },(error)=>{
        this.alertify.error(error)
      });
  }
}
