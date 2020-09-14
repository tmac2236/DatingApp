import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QueryPDModel } from 'src/app/_models/query-pd-model';
import { SQueryPDModel } from 'src/app/_models/s-query-pd-model';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ReportService } from 'src/app/_services/report.service';

@Component({
  selector: 'app-query-pd-model',
  templateUrl: './query-pd-model.component.html',
  styleUrls: ['./query-pd-model.component.scss'],
})
export class QueryPdModelComponent implements OnInit {
  qeryPDModel: QueryPDModel[];
  sQueryPDModel = new SQueryPDModel();
  constructor(
    private http: HttpClient,
    private reportService: ReportService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  search() {
    console.log(this.sQueryPDModel);
    this.reportService.getPDModel(this.sQueryPDModel).subscribe(
      (res) => {
        this.qeryPDModel = res;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
