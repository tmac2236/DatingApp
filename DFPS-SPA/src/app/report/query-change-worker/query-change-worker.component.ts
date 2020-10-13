import { Component, OnInit } from '@angular/core';
import { Utility } from 'src/app/utility/utility';
import { ChangeWorker } from 'src/app/_models/change-worker';
import { SQueryPDModel } from 'src/app/_models/s-query-pd-model';
import { ReportService } from 'src/app/_services/report.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-query-change-worker',
  templateUrl: './query-change-worker.component.html',
  styleUrls: ['./query-change-worker.component.scss'],
})
export class QueryChangeWorkerComponent implements OnInit {
  
  changeWorkers: ChangeWorker[];
  sQueryPDModel = new SQueryPDModel();
  constructor(
    private utility: Utility,
    private reportService: ReportService,
    private datepipe: DatePipe,
  ) {}

  ngOnInit() {
    this.sQueryPDModel.startDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.sQueryPDModel.endDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  }

  search() {
    this.clean();
    this.utility.spinner.show();
    this.reportService.getChangeWorkers(this.sQueryPDModel).subscribe(
      (res) => {
        this.changeWorkers = res;
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
      this.utility.baseUrl + 'report/exportGetChangeWorkers?startDate=' +
      this.sQueryPDModel.startDate + '&endDate=' +
      this.sQueryPDModel.endDate + '&teamID=' +
      this.sQueryPDModel.teamID
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
        const filename = 'Excel_GetChangeWorkers_' + currentTime.getFullYear().toString() +
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
  clean(){
    this.changeWorkers =[];
  }
}
