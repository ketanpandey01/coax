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
  defaultColDef:any;

  rowData1 = [
    {"event1":34234,"event2":23,"event3":234234,"event4":2008,"price1":6577,"price2":4454,"price3":8,"price4":87687,"price5":2323,"price6":8}
  ];

  constructor() {}

  ngOnInit(): void {
    // var inputObj:any = document.querySelector("input[type='file']");
    // inputObj.click();
    this.displayGrid=true;
    this.columnDefs = [
      {
        headerName: 'Event',
        children: [
          {
            headerName: 'event1',
            field: 'event1',
            width: 180,
          },
          {
            headerName: 'event2',
            field: 'event2',
            width: 90
          },
          {
            headerName: 'event3',
            field: 'event3',
            width: 140,
          },
          {
            headerName: 'event4',
            field: 'event4',
            width: 140,
          }
        ],
      },
      {
        headerName: 'Old Price',
        children: [
          {
            headerName: 'price1',
            field: 'price1',
            width: 180,
          },
          {
            headerName: 'price2',
            field: 'price2',
            width: 90
          },
          {
            headerName: 'price3',
            field: 'price3',
            width: 140,
          },
          {
            headerName: 'price4',
            field: 'price4',
            width: 140,
          },
          {
            headerName: 'price5',
            field: 'price5',
            width: 140,
          },
          {
            headerName: 'price6',
            field: 'price6',
            width: 140,
          }
        ],
      },
      {
        headerName: 'New Price',
        children: [
          {
            headerName: 'price1',
            field: 'newprice1',
            width: 180,
          },
          {
            headerName: 'price2',
            field: 'newprice2',
            width: 90
          },
          {
            headerName: 'price3',
            field: 'newprice3',
            width: 140,
          },
          {
            headerName: 'price4',
            field: 'newprice4',
            width: 140,
          }
        ],
      }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
    };
  }

  // ngAfterViewInit(){
  //   var inputObj:any = document.querySelector("input[type='file']");
  //   console.log(inputObj);
  //   inputObj.click();
  // }
  onFileSelect(event: any) {
    console.log('events',event);
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
      console.log('ws',ws);
      /* save data */
      const data = XLSX.utils.sheet_to_json(ws, {header: 1}); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log("json",data);
      console.log(JSON.stringify(data[0]));
      console.log("json2",XLSX.utils.sheet_to_json(ws, {header: 1}));  // Data will be logged in array format containing objects
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
