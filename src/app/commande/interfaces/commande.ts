import { Client } from "./client";

export interface Commande {
    client : Client,
    id: number,
    numero_commande: number,
    date_commande: string,
    etat_commande : boolean,
    etat : string

}
