import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/shared/interfaces/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  panelOpenState : boolean = false;

  listeMenu : Menu[] = [];

  constructor(private menuService : MenuService){


  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.menuService.getAllMenu().subscribe({
      next : (value) =>{
        if(value.status){
          this.listeMenu = value.data
        }
      },
      error : (err) =>{
        console.log(err);
        
      },
      complete : ()=>{

      }
    })
  }

;
}
