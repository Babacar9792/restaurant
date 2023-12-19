import { Injectable } from '@angular/core';
import { Commande } from '../interfaces/commande';
import { Observable, of, tap } from 'rxjs';
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
      message : "list des données",
      status : true,
      data : this.ELEMENT_DATA
    });
   }
   public deleteCommande(tab : number[]){
    let i = Math.random()*10;
        return of({
          data : i > 5 ? [] : tab,
          message : i > 5 ? "une erreur s'est produite, veuillez recommencer" : "Suppression réussie",
          status : !(i > 5)
        }).pipe(tap(value => console.log(value)
        ));
   }
}
