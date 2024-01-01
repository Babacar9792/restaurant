import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Menu } from 'src/app/shared/interfaces/menu';
import { ResponseData } from 'src/app/shared/interfaces/response-data';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menus : Menu[] = [];

  constructor() { 
    for (let i = 0; i < 10; i++) {
      this.menus.push({
        
          libelle : "menu "+i,
          articles : [
            {
            id : 3,
            libelle : "article 3",
            montant : 3000
          },
          {
            id : i+1,
            libelle : "article "+(i+1),
            montant : 3000
          }
        ]
        
      })
    }

  }

  getAllMenu() : Observable<ResponseData<Menu>>{
    return of({
      data : this.menus,
      message : "",
      status : true
    });

  }
}
