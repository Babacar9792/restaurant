import { Injectable } from '@angular/core';
import { Commande } from '../interfaces/commande';
import { Observable, catchError, filter, map, of, tap } from 'rxjs';
import { ResponseData } from '../interfaces/response-data';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  ELEMENT_DATA: Commande[] = [];

  constructor() {

    for (let i = 1; i <= 100; i++) {
      this.ELEMENT_DATA.push({
        client : {
          id : i,
          prenom: `Prénom${i}`,
          nom: `Nom${i}`,
          telephone: `123-456-789${i}`,
          adresse: `Adresse${i}`,
          mail: `email${i}@example.com`,
        },
        id: i,
        numero_commande: 1000 + i,
        date_commande: `2023-01-${i < 10 ? "0" : ""}${i}`,
        etat_commande : i%3==0 ? true : false,
        etat : i %11 == 0 ? "Validée" : "En cours"
      });
    }
   }

   public  getAllCommande(user_id : number, date_commande : string) : Observable<ResponseData<Commande>> {
    return of<ResponseData<Commande>>({
      message : "liste des données",
      status : true,
      data : this.ELEMENT_DATA
    });
   }
   public deleteCommande(tab : number[]){
    let i = Math.random()*10;
        return of({
          data : i > 5 ? [] : tab,
          message : i > 5 ? "une erreur s'est produite, veuillez recommencer" : "Suppression réussie",
          status : i <= 5
        }).pipe(
          tap(value => {console.log(value)},
         
        ),catchError(err => {
          alert(err.error.message);
          throw new Error(err);
        }));
   }

   filterData(filtre : string, user_id : number, date : string) : Observable<ResponseData<Commande>>{
    if(filtre == "Tout"){
      return this.getAllCommande(user_id, date);
    }
    return this.getAllCommande(user_id, date).pipe(
      map(ele => {
        ele.data = ele.data.filter(element => element.etat == filtre);
        return ele;
      }),
    );
   }
   valideCommande(user_id : number, numero_commande : number) : Observable<ResponseData<any>>{
    let i = Math.round(Math.random()*10);
    // console.log(i);
    
    return of({
      message : i%2==0 ? "La commande a bien été validée" : "Une érreur s'est produite lors de la validation",
      data : [],
      status : i%2==0
    })
   }
   annuleCommande(user_id : number, numero_commande : number): Observable<ResponseData<any>>{
    let i = Math.round(Math.random()*10);
    return of({
      message : i%2==0 ? "La commande a bien été annulée" : "Une érreur s'est produite lors de l'annulation",
      data : [],
      status : i%2==0
    })
   }
}
