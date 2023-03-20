import { HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class GreenkoUtils {
  constructor() {}

  getDateDiff(start: Date, end: Date) {
    if (start && end) {
      const date1: any = new Date(start);
      const date2: any = new Date(end);
      let diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        diffDays = 1;
      }
      return diffDays;
    }
  }

  getStructure(data: any) {
    if (data && data.length > 0) {
      let format: any;
      data.forEach((element: any) => {
        if (!format) {
          format = element;
        } else {
          format = format + ' >> ' + element;
        }
      });
      return format;
    }
  }

  searchText = new EventEmitter<any>();
}
