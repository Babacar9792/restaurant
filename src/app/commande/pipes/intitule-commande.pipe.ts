import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../interfaces/client';

@Pipe({
  name: 'intituleCommande'
})
export class IntituleCommandePipe implements PipeTransform {

  transform(value: Client): string {
    return value.prenom+ ' '+ value.nom + ' ';
  }

}
