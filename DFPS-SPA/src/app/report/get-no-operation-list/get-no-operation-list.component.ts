import { Component, OnInit } from '@angular/core';
import { Utility } from 'src/app/utility/utility';
import { NoOperationList } from 'src/app/_models/no-operation-list';
import { ReportService } from 'src/app/_services/report.service';

@Component({
  selector: 'app-get-no-operation-list',
  templateUrl: './get-no-operation-list.component.html',
  styleUrls: ['./get-no-operation-list.component.scss'],
})
export class GetNoOperationListComponent implements OnInit {
  startDate: string;
  noOperationsList: NoOperationList[];
  arr = []; //use for 68 lean loop
  constructor(
    private utility: Utility,
    private reportService: ReportService,
  ) {}

  ngOnInit() {}

  search() {
    this.clean();
    this.utility.spinner.show();
    this.reportService.getNoOperations(this.startDate).subscribe(
      (res) => {
        this.noOperationsList = res;
        for (let i = 0; i < this.noOperationsList.length; i++){
          this.arr.push(i);
        }
        this.utility.spinner.hide();
      },
      (error) => {
        this.utility.spinner.hide();
        this.utility.alertify.error(error);
      }
    );
  }
  clean(){
    this.noOperationsList =[];
    this.arr = [];
  }
}
