import { Injectable } from "@angular/core";
// import * as FileSaver from "angular-file-saver";
import * as XLSX from "xlsx";
import * as _ from "lodash";
import { Workbook } from "exceljs";
import * as fs from "file-saver";

@Injectable({
  providedIn: "root",
})
export class ExcelService {
  constructor() {}
  title: any;
  header: any;
  data: any;

  export(excelData: any) {
    // const title = "Goods_Receipt";
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("goods data");

    worksheet.mergeCells("A1", "C2");
    let titleRow = worksheet.getCell("A1");
    titleRow.value = title;
    titleRow.font = {
      name: "Calibri",
      size: 16,
      underline: "single",
      bold: true,
      color: { argb: "000506" },
    };
    titleRow.alignment = { vertical: "middle", horizontal: "center" };

    //  worksheet.mergeCells("A2:B2");
    //  let d = new Date();
    //  let date = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
    //  let dateCell = worksheet.getCell("A2");
    //  dateCell.value = date;
    //  dateCell.font = {
    //    name: "Calibri",
    //    size: 12,
    //    bold: true,
    //  };
    // dateCell.alignment = { vertical: "middle", horizontal: "center" };
    const date = worksheet.addRow(["From 01-Apr-20 To 31-Aug-20"]);

    // worksheet.addRow([]);

    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "9696FF" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "000506" },
        size: 12,
      };
    });
    let dataRow = worksheet.addRow(data);
    dataRow.eachCell((cell) => {
      cell.font = {
        bold: true,
        color: { argb: "000506" },
        size: 12,
      };
    });

    // data.forEach((d) => {
    //   let row = worksheet.addRow(d);

    //   let sales = row.getCell(6);
    //   let color = "FF99FF99";
    //   if (+ sales.value < 200000) {
    //     color = "FF9999";
    //   }

    //   sales.fill = {
    //     type: "pattern",
    //     pattern: "solid",
    //     fgColor: { argb: color },
    //   };
    // });

    worksheet.getColumn(3).width = 20;
    worksheet.addRow([]);

    // let footerRow = worksheet.addRow(['Employee Sales Report Generated from example.com at ' + date]);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFB050' }
    // };

    //Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }
}

// public exportAsExcelFile(json: any[], excelFileName: string): void {
//   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
//   console.log("worksheet", worksheet);
//   const workbook: XLSX.WorkBook = {
//     Sheets: { data: worksheet },
//     SheetNames: ["data"],
//   };
//   const excelBuffer: any = XLSX.write(workbook, {
//     bookType: "xlsx",
//     type: "array",
//   });
//   //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
//   this.saveAsExcelFile(excelBuffer, excelFileName);
// }

// private saveAsExcelFile(buffer: any, fileName: string): void {
//   const data: Blob = new Blob([buffer], {
//     type: EXCEL_TYPE,
//   });
// FileSaver.saveAs(
//   data,
//   fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
// );
// }
// }
