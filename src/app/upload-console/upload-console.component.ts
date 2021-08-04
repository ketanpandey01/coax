import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-console',
  templateUrl: './upload-console.component.html',
  styleUrls: ['./upload-console.component.css'],
})
export class UploadConsoleComponent implements OnInit {
  gridApi:any;
  gridColumnApi:any;
  rowData: any = [];
  columnDefs: any = [];
  displayGrid: boolean = false;

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

  onFileSelect(event: any) {
    // console.log('data event', event);
    if (event.currentFiles && event.currentFiles.length) {
      let selectedFile = event.currentFiles[0];
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
      fileReader.readAsText(selectedFile, 'UTF-8');
    }
  }

  formatCols(headers: any) {
    if (headers && headers.length) {
      for(let index in headers){
        this.columnDefs.push({ field: headers[index], id: index});
      }
    }
    console.log('colsdef', this.columnDefs);
    // this.displayGrid = true;
  }

  formatRows(data: any){
    console.log("rowData", data)
    data.forEach((item: any) => {
      let rowSkeltn:any = {};
      this.columnDefs.forEach((col: any) => {
        rowSkeltn[col.field] = null;
      });
      for(let index in item){
        var col = this.columnDefs.find((x:any) => x.id === index)
        if(col){
          rowSkeltn[col.field] = item[index];
        }
      }
      this.rowData.push(rowSkeltn);
    });
    console.log("rowSkeleton", this.rowData);
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

  onGridReady(params:any) {
    console.log('inside grid');
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
