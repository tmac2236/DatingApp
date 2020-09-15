import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChangeWorker } from 'src/app/_models/change-worker';
import { SQueryPDModel } from 'src/app/_models/s-query-pd-model';
import { AlertifyService } from 'src/app/_services/alertify.service';
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
    private http: HttpClient,
    private reportService: ReportService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}
  
  search() {
    console.log(this.sQueryPDModel);
    this.reportService.getChangeWorkers(this.sQueryPDModel).subscribe(
      (res) => {
        this.changeWorkers = res;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
