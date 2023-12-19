import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Commande } from '../../interfaces/commande';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CommandeService } from '../../services/commande.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ResponseData } from '../../interfaces/response-data';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements AfterViewInit, OnInit, OnDestroy{
  selected = 'option2';

  ELEMENT_DATA :Commande[] = [];

  data !: Observable<ResponseData<Commande>>;

  dataUnsubscribe : Subject<Boolean> = new Subject();

  displayedColumns: string[] = ['checkbox','numero', 'intitule', 'telephone','etat', 'action'];

  dataSource = new MatTableDataSource<Commande>(this.ELEMENT_DATA);

  commandesToDelete : number[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private commandeService : CommandeService){
    
  }
  ngOnDestroy(): void {
    this.dataUnsubscribe.next(true);
    // throw new Error('Method not implemented.');
  }

  
    

  ngOnInit(): void {
    this.data = this.commandeService.getAllCommande(1, "");
    this.data.pipe(takeUntil(this.dataUnsubscribe)).subscribe({
      next : (value) =>{
        if(value.status){
          this.ELEMENT_DATA = value.data;
          this.dataSource = new MatTableDataSource<Commande>(this.ELEMENT_DATA);
        }
        else{
          alert(value.message);
        }
      },
      error : (err) =>{
        console.log(err);
      },
      complete : ()=>{
        console.log("completed");
        
      }
    });
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filtreCommande(event : Event){
  }

  chooseToDelete(id : number, event : MatCheckboxChange){
    console.log(event.checked);
    if (event.checked) {
      this.commandesToDelete.push(id);
    }
    else{
      this.commandesToDelete = this.commandesToDelete.filter((element : number) => element != id )
    }
  }

  deleteCommande(){
    // console.log(this.commandesToDelete);
    this.commandeService.deleteCommande(this.commandesToDelete).subscribe();
    
  }




 
  


}
