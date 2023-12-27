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
import {MatSort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss'],
  animations : [
    trigger('displayItem', [
      state("new",style({})),
      transition('void =>*', [
        style({
          'transform' : 'translateX(-100%)',
          'opacity' : "0"
        }),
        animate('500ms ease-in-out', style({
          'transform' : 'transformX(0)',
          'opacity' : '1'
        }))
      ]),
      transition('* => void', [
        style({
          'transform' : 'translateX(0%)',
          'opacity' : "1"
        }),
        animate('500ms ease-in-out', style({
          'transform' : 'transformX(100%)',
          'opacity' : '0'
        }))
      ])
    ])
  ]
})
export class CommandeComponent implements AfterViewInit, OnInit, OnDestroy{
  selected = 'option2';

  ELEMENT_DATA :Commande[] = [];
stateToAnimate : string = "new"

  data !: Observable<ResponseData<Commande>>;

  dataUnsubscribe : Subject<boolean> = new Subject();

  displayedColumns: string[] = ['checkbox','numero_commande', 'client.prenom', 'client.telephone','etat', 'date_commande', 'action'];

  dataSource = new MatTableDataSource<Commande>(this.ELEMENT_DATA);
  user_id : number = 1;

  commandesToDelete : number[] = [];
  dayForCommande : Date = new Date();
  @ViewChild(MatSort) sort !: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private commandeService : CommandeService, public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer){
    
  }
  /** */
  ngOnDestroy(): void {
    this.dataUnsubscribe.next(true);
    ;
  }
  /** */
  
  ngOnInit(): void {
    this.dayForCommande = new Date();
    this.dataSource.sort = this.sort;
    this.getData(this.user_id,this.joursDuMois(this.dayForCommande));
    this.filterPredicate();
    // console.log(this.joursDuMois(this.dayForCommande));
    
  }

  /** Methode pour obtenir le premier et le dernier jour du mois, il pends en parametre une date et selon cette date, nous fournie le premier et le derniee jour du mois */

  joursDuMois(date : Date) {
    let jours = [];
    let dateDebut = new Date(date);
    let mois = dateDebut.getMonth();
    dateDebut.setDate(1);
    while (dateDebut.getMonth() === mois) {
        jours.push(new Date(dateDebut));
        dateDebut.setDate(dateDebut.getDate() + 1);
    }
    return [jours[0], jours[jours.length - 1]];
}
/** */
  getData(user_idser_id : number, jours : Date[]){
    this.data = this.commandeService.getAllCommande(1,jours[0].toISOString(),jours[1].toISOString() );
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
      }
    });
  }
  /** */
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  /** */

  filtreCommande(event : string){
    const filterValue = event;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterPredicate(){
    this.dataSource.filterPredicate = function (data, filter) : boolean {
      return data.client.prenom.toLowerCase().includes(filter) ||
              data.client.nom.toLowerCase().includes(filter) ||
              (data.client.prenom+' '+data.client.nom).toLowerCase().includes(filter) ||
              data.client.telephone.toLowerCase().includes(filter) ||
              data.etat.toLowerCase().includes(filter) ||
              data.numero_commande.toString().includes(filter)
    }
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
    this.commandeService.deleteCommande(this.commandesToDelete).subscribe({
      next : (val)=>{
        if (val.status) {
            this.dataSource.data = this.dataSource.data.filter(ele =>  !this.commandesToDelete.includes(ele.numero_commande))
            this.commandesToDelete = [];
        }

      }
    });
  }
  /** Methode pour ouvrir le modale*/

  openDialog(data : Commande) {
    const dialogRef = this.dialog.open(DetailComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  /** Methode pour changer de mois */

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
    this.getData(this.user_id,this.joursDuMois(this.dayForCommande));
    
    
  }
  /** Methode pour valider une commande */
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
    this.commandeService.annuleCommande(1,numero_commande).subscribe({
      next : (val)=>{
       
        if(val.status){
          let index = this.ELEMENT_DATA.findIndex(ele => ele.numero_commande == numero_commande);
          this.ELEMENT_DATA[index].etat = "Annulée";
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
