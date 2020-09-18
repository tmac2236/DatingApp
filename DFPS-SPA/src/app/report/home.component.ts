import { Component, OnInit } from '@angular/core';
import { PlanWorker } from '../_models/plan-worker';
import { ReportDataPass } from '../_models/report-data-pass';
import { ReportService } from '../_services/report.service';
import { SReportDataPass } from '../_models/s_report-data-pass';

import { Utility } from '../utility/utility';

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
    private utility: Utility,
    private reportService: ReportService,
  ) {}

  ngOnInit() {
    //default checkPass= 0 
    this.sReportDataPass.checkPass = '0';
    //
  }

  registerToggle() {
    this.registerMode = true;
  }

  getValues() {
    this.utility.http
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
    this.utility.spinner.show();
    this.clean();
    console.log(this.sReportDataPass);
    this.reportService.getReportDataPass(this.sReportDataPass).subscribe(
      (res) => {
        this.reportDataPass = res;
        this.utility.spinner.hide();
      },
      (error) => {
        this.utility.spinner.hide();
        this.utility.alertify.error(error);
      }
    );

  }
  clean(){
    this.planWorker = [];
    this.reportDataPass = [];
  }
}
