import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NoOperationList } from 'src/app/_models/no-operation-list';
import { AlertifyService } from 'src/app/_services/alertify.service';
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
    private http: HttpClient,
    private reportService: ReportService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  search() {
    this.clean();
    this.reportService.getNoOperations(this.startDate).subscribe(
      (res) => {
        this.noOperationsList = res;
        for (let i = 0; i < this.noOperationsList.length; i++){
          this.arr.push(i);
        }
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
  clean(){
    this.noOperationsList =[];
    this.arr = [];
  }
}
