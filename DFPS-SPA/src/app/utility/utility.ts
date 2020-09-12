import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Utility {
  baseUrl = environment.apiUrl;

  constructor() {}

  getToDay() {
    const toDay =
      new Date().getFullYear().toString() +
      '/' +
      (new Date().getMonth() + 1).toString() +
      '/' +
      new Date().getDate().toString();
    return toDay;
  }

  getDateFormat(day: Date) {
    const dateFormat =
      day.getFullYear().toString() +
      '/' +
      (day.getMonth() + 1).toString() +
      '/' +
      day.getDate().toString();
    return dateFormat;
  }
}
