import { Component, OnInit } from '@angular/core';
import { Utility } from 'src/app/utility/utility';
import { NoOperationList } from 'src/app/_models/no-operation-list';
import { ReportService } from 'src/app/_services/report.service';
import { DatePipe } from '@angular/common';

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
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.startDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  }

  export() {
    this.utility.http
      .get(this.utility.baseUrl + 'report/exportGetNoOperaionList?startDate=' + this.startDate, {
        responseType: 'blob',
      })
      .subscribe((result: Blob) => {
        if (result.type !== 'application/xlsx') {
          alert(result.type);
        }
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentTime = new Date();
        const filename =
          'Excel_NoOperationList_' +
          currentTime.getFullYear().toString() +
          (currentTime.getMonth() + 1) +
          currentTime.getDate() +
          currentTime
            .toLocaleTimeString()
            .replace(/[ ]|[,]|[:]/g, '')
            .trim() +
          '.xlsx';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
  }
  search() {
    this.clean();
    this.utility.spinner.show();
    this.reportService.getNoOperations(this.startDate).subscribe(
      (res) => {
        this.noOperationsList = res;
        for (let i = 0; i < this.noOperationsList.length; i++) {
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
  clean() {
    this.noOperationsList = [];
    this.arr = [];
  }
}
