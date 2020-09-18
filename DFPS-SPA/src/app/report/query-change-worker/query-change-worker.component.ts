import { Component, OnInit } from '@angular/core';
import { Utility } from 'src/app/utility/utility';
import { ChangeWorker } from 'src/app/_models/change-worker';
import { SQueryPDModel } from 'src/app/_models/s-query-pd-model';
import { ReportService } from 'src/app/_services/report.service';

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
  ) {}

  ngOnInit() {}
  
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
  clean(){
    this.changeWorkers =[];
  }
}
