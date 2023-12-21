import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Commande } from '../../interfaces/commande';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CommandeService } from '../../services/commande.service';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { ResponseData } from '../../interfaces/response-data';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements AfterViewInit, OnInit, OnDestroy{
  selected = 'option2';

  ELEMENT_DATA :Commande[] = [];

  data !: Observable<ResponseData<Commande>>;

  dataUnsubscribe : Subject<boolean> = new Subject();

  displayedColumns: string[] = ['checkbox','numero', 'intitule', 'telephone','etat', 'action'];

  dataSource = new MatTableDataSource<Commande>(this.ELEMENT_DATA);

  commandesToDelete : number[] = [];
  dayForCommande : Date = new Date();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private commandeService : CommandeService, public dialog: MatDialog){
    
  }
  /** */
  ngOnDestroy(): void {
    this.dataUnsubscribe.next(true);
  }
  /** */

  ngOnInit(): void {
    this.dayForCommande = new Date();
    this.data = this.commandeService.getAllCommande(1, "");
    this.getData(this.data, 1, "");
  }
/** */
  getData(data : Observable<ResponseData<Commande>> ,user_id : number, date : string){
    this.dataSource = new MatTableDataSource<Commande>([]);
    data.pipe(takeUntil(this.dataUnsubscribe)).subscribe({
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
  /** */
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  /** */

  filtreCommande(event : string){
  this.data =  this.commandeService.filterData(event, 1, "");
  this.getData(this.data, 1,"");
  }
  /** */

  chooseToDelete(id : number, event : MatCheckboxChange){
    if (event.checked) {
      this.commandesToDelete.push(id);
    }
    else{
      this.commandesToDelete = this.commandesToDelete.filter((element : number) => element != id )
    }
  }
  /** */

  deleteCommande(){
    this.commandeService.deleteCommande(this.commandesToDelete).subscribe();
  }
  /** */

  openDialog() {
    const dialogRef = this.dialog.open(DetailComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  /** */

  nextMonth(nextOrPreview : string){
    switch (nextOrPreview) {
      case 'next':
                  if (this.dayForCommande.getMonth() == 11) {
                        this.dayForCommande = new Date(this.dayForCommande.getFullYear() + 1, 0, 10);
                  }else{ 
                        this.dayForCommande = new Date(this.dayForCommande.getFullYear() , this.dayForCommande.getMonth()+1, 10);
      }
      break;
      case 'previous': 
                  if (this.dayForCommande.getMonth() == 0 ) {
                        this.dayForCommande = new Date(this.dayForCommande.getFullYear() - 1, 11, 10);
                  }else{ 
                        this.dayForCommande = new Date(this.dayForCommande.getFullYear() , this.dayForCommande.getMonth()-1, 10);
      }
      break;
      default:
        this.dayForCommande = new Date();
        break;
    }
    
  }
  /** */
  valideCommande(numero_commande : number){
    this.commandeService.valideCommande(1,numero_commande).subscribe({
      next : (val)=>{
        if(val.status){
          let index = this.ELEMENT_DATA.findIndex(ele => ele.numero_commande == numero_commande);
          this.ELEMENT_DATA[index].etat = "Validée"; 
        }
        alert(val.message);
      },
      error : (err)=>{
        alert(err.error.message);
      },
      complete : ()=>{
        
      }
    });
  }

  annuleCommande(numero_commande : number){
    // alert(numero_commande);
    this.commandeService.annuleCommande(1,numero_commande).subscribe({
      next : (val)=>{
        if(val.status){
          // let index = this.ELEMENT_DATA.findIndex(ele => ele.numero_commande == numero_commande);
          this.ELEMENT_DATA = this.ELEMENT_DATA.filter(ele => ele.numero_commande != numero_commande); 
          this.dataSource = new MatTableDataSource<Commande>(this.ELEMENT_DATA);  
        }
        alert(val.message);
      },
      error : (err)=>{
        alert(err.error.message);
      },
      complete : ()=>{
        
      }
    });
  }




 
  


}
