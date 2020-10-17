import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utility } from '../utility/utility';
import { Attendance } from '../_models/attendance';
import { ChangeWorker } from '../_models/change-worker';
import { NoOperationList } from '../_models/no-operation-list';
import { PaginatedResult } from '../_models/pagination';
import { QueryPDModel } from '../_models/query-pd-model';
import { ReportDataPass } from '../_models/report-data-pass';
import { SQueryPDModel } from '../_models/s-query-pd-model';
import { SReportDataPass } from '../_models/s_report-data-pass';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SAttendance } from '../_models/s_attendance';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private utility: Utility) {}

  getNoOperations(startDate: string) {
    return this.utility.http.get<NoOperationList[]>(
      this.utility.baseUrl + 'report/getNoOperation?startDate=' + startDate
    );
  }

  getReportDataPass(sReportDataPass: SReportDataPass) {
    console.log('reportService: ' + sReportDataPass.lineID);
    return this.utility.http.post<ReportDataPass[]>(
      this.utility.baseUrl + 'report/getReportDataPass',
      sReportDataPass
    );
  }

  getPDModel(sQueryPDModel: SQueryPDModel) {
    console.log('reportService: ' + sQueryPDModel.teamID);
    return this.utility.http.post<QueryPDModel[]>(
      this.utility.baseUrl + 'report/getQueryPDModel',
      sQueryPDModel
    );
  }

  getAttendances(
    sAttendance: SAttendance
  ): Observable<PaginatedResult<Attendance[]>> {
    const paginatedResult: PaginatedResult<Attendance[]> = new PaginatedResult<
      Attendance[]
    >();

    let params = new HttpParams();
    params = params.append('IsPaging', sAttendance.isPaging.toString());
    if (sAttendance.currentPage != null && sAttendance.itemsPerPage != null) {
      params = params.append('pageNumber', sAttendance.currentPage.toString());
      params = params.append('pageSize', sAttendance.itemsPerPage.toString());
      //params = params.append('orderBy', sAttendance.orderBy);
    }

    return this.utility.http
      .get<Attendance[]>(this.utility.baseUrl + 'report/getAttendanceList', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  getChangeWorkers(sQueryPDModel: SQueryPDModel) {
    console.log('reportService: ' + sQueryPDModel.teamID);
    return this.utility.http.post<ChangeWorker[]>(
      this.utility.baseUrl + 'report/getChangeWorkers',
      sQueryPDModel
    );
  }
}
