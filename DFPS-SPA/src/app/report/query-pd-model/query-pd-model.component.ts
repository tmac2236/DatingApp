import { Component, OnInit } from '@angular/core';
import { Utility } from 'src/app/utility/utility';
import { QueryPDModel } from 'src/app/_models/query-pd-model';
import { SQueryPDModel } from 'src/app/_models/s-query-pd-model';
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
    private utility: Utility,
    private reportService: ReportService,
  ) {}

  ngOnInit() {}

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

  clean(){
    this.qeryPDModel =[];
  }
}
