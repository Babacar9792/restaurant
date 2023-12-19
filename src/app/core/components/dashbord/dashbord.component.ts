import { Component } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent {
  typesOfShoes: {uri : string, value : string}[] = [
    {
      uri : "/menu",
      value : "menu"
    },
    {
      uri : "/commande",
      value : "commande"
    },
    {
      uri : "/article",
      value : "article"
    }

  ];


}
