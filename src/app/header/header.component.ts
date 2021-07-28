import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
          label:'Home',
      },
      {
          label:'Browser',
          items:[
              {
                  label:'Left',
                  icon:'pi pi-fw pi-align-left'
              }

          ]
      },
      {
          label:'Upload Console',
          items:[
              {
                  label:'new upload',
                  icon:'pi pi-fw pi-user-plus',

              }
          ]
      },
      {
          label:'Operational Console',
          items:[
              {
                  label:'Edit'
              }
          ]
      },
      {
          label:'Reports'
      },
      {
        label:'Monitoring',
        items:[
            {
                label:'Edit'
            }
        ]
    },
  ];
  }

}
