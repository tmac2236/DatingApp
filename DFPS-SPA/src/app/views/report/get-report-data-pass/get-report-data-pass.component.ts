import { Component, OnInit } from '@angular/core';
import { PlanWorker } from 'src/app/core/_models/plan-worker';
import { ReportDataPass } from 'src/app/core/_models/report-data-pass';
import { ReportService } from 'src/app/core/_services/report.service';
import { SReportDataPass } from 'src/app/core/_models/s_report-data-pass';
import { Utility } from 'src/app/core/utility/utility';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './get-report-data-pass.component.html',
  styleUrls: ['./get-report-data-pass.component.scss'],
})
export class GetReportDataPassComponent implements OnInit {
  registerMode = false;
  planWorker: PlanWorker[];
  reportDataPass: ReportDataPass[];
  sReportDataPass = new SReportDataPass();
  constructor(
    private utility: Utility,
    private reportService: ReportService,
    private datepipe: DatePipe,
  ) {}

  ngOnInit() {
    //default checkPass= 0 
    this.sReportDataPass.checkPass = '0';
    this.sReportDataPass.cDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.sReportDataPass.cDateE = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
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
  export() {
    this.utility.spinner.show();
    this.utility.http.get(
      this.utility.baseUrl + 'report/exportGetReportDataPass?lineID=' +
      this.sReportDataPass.lineID + '&modelName=' +
       this.sReportDataPass.modelName + '&model=' +
       this.sReportDataPass.model + '&checkPass=' +
       this.sReportDataPass.checkPass + '&cDate=' +
       this.sReportDataPass.cDate + '&cDateE=' +
       this.sReportDataPass.cDateE
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
        const filename = 'Excel_GetReportDataPass_' + currentTime.getFullYear().toString() +
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
