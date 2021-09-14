import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
@Component({
  selector: 'app-upload-console',
  templateUrl: './upload-console.component.html',
  styleUrls: ['./upload-console.component.css'],
})
export class UploadConsoleComponent implements OnInit {
  gridApi: any;
  gridColumnApi: any;
  rowData: any = [];
  columnDefs: any = [];
  displayGrid: boolean = false;
  selectedFile: any;

  rowData1 = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
  ];

  constructor() {}

  ngOnInit(): void {
    // var inputObj:any = document.querySelector("input[type='file']");
    // inputObj.click();
  }

  // ngAfterViewInit(){
  //   var inputObj:any = document.querySelector("input[type='file']");
  //   console.log(inputObj);
  //   inputObj.click();
  // }
  onFileSelect(event: any) {
    if (event.target && event.target.files) {
      this.selectedFile = event.target.files[0];
      console.log('selectedFile', this.selectedFile);
    }
  }

  uploadData() {
    // console.log('data event', event);
    if (this.selectedFile) {
      // console.log('file', selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        let csv = fileReader.result as string;
        let allTextLines = csv.split(/\r|\n|\r/);
        // console.log(allTextLines);
        let headers = allTextLines[0].split(',');
        // console.log(headers);
        this.formatCols(headers);
        let tempData = [];
        for (let i = 1; i < allTextLines.length; i++) {
          // split content based on comma
          if (allTextLines[i]) {
            let data = allTextLines[i].split(',');
            if (data.length === headers.length) {
              tempData.push(data);
              // lines.push(tarr);
            }
          }
        }
        this.formatRows(tempData);
        // console.log(this.rowData);
      };
      fileReader.readAsText(this.selectedFile, 'UTF-8');
    }
  }

  // uploadExcel() {
  //   if (this.selectedFile) {
  //     // console.log('file', selectedFile);
  //     const fileReader = new FileReader();
  //     fileReader.onload = function (e:any) {
  //       var data = e.target.result;
  //       var workbook = XLSX.read(data, {
  //         type: 'binary',
  //       });
  //       workbook.SheetNames.forEach(function (sheetName:any) {
  //         var excelRows = XLSX.utils.sheet_to_row_object_array(
  //           workbook.Sheets[sheetName]
  //         );
  //         var jsonObj = JSON.stringify(excelRows);
  //         console.log(jsonObj);
  //       });
  //     };
  //     fileReader.readAsBinaryString(this.selectedFile);
  //   }
  // }

  uploadExcel() {
    /* wire up file reader */
    // const target: DataTransfer = <DataTransfer>(event.target);
    // if (target.files.length !== 1) {
    //   throw new Error('Cannot use multiple files');
    // }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(this.selectedFile);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(data); // Data will be logged in array format containing objects
    };
 }

  formatCols(headers: any) {
    if (headers && headers.length) {
      for (let index in headers) {
        this.columnDefs.push({ field: headers[index], id: index });
      }
    }
    console.log('colsdef', this.columnDefs);
    // this.displayGrid = true;
  }

  formatRows(data: any) {
    console.log('rowData', data);
    data.forEach((item: any) => {
      let rowSkeltn: any = {};
      this.columnDefs.forEach((col: any) => {
        rowSkeltn[col.field] = null;
      });
      for (let index in item) {
        var col = this.columnDefs.find((x: any) => x.id === index);
        if (col) {
          rowSkeltn[col.field] = item[index];
        }
      }
      this.rowData.push(rowSkeltn);
    });
    console.log('rowSkeleton', this.rowData);
    this.displayGrid = true;
  }

  //   setHeaderNames() {
  //     console.log("grid api", this.gridApi)
  //     var columnDefs = this.gridApi.getColumnDefs();
  //     console.log("columns", columnDefs)
  //     // columnDefs.forEach(function(colDef, index) {
  //     //     colDef.headerName = "C" + index;
  //     // });
  //     this.columnDefs = columnDefs;
  // }

  onGridReady(params: any) {
    console.log('inside grid');
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
