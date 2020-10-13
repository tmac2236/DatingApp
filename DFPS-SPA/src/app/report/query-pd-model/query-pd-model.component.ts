import { Component, OnInit } from '@angular/core';
import { Utility } from 'src/app/utility/utility';
import { QueryPDModel } from 'src/app/_models/query-pd-model';
import { SQueryPDModel } from 'src/app/_models/s-query-pd-model';
import { ReportService } from 'src/app/_services/report.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-query-pd-model',
  templateUrl: './query-pd-model.component.html',
  styleUrls: ['./query-pd-model.component.scss'],
})
export class QueryPdModelComponent implements OnInit {
  qeryPDModel: QueryPDModel[];
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
    this.reportService.getPDModel(this.sQueryPDModel).subscribe(
      (res) => {
        this.qeryPDModel = res;
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
      this.utility.baseUrl + 'report/exportGetQueryPDModel?startDate=' +
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
        const filename = 'Excel_GetQueryPDModel_' + currentTime.getFullYear().toString() +
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
    this.qeryPDModel =[];
  }
}
