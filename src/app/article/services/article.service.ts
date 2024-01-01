import { Injectable } from '@angular/core';
import { Observable, of, range } from 'rxjs';
import { Article } from 'src/app/shared/interfaces/article';
import { ResponseData } from 'src/app/shared/interfaces/response-data';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: Article[] = [];

  constructor() {
    for (let i = 0; i < 30; i++) {
      // const element = array[i];
      this.articles.push({
        id : i,
        libelle : "article "+i,
        montant : Math.random()*10
      })
      
    }

   }
  getArticle() : Observable<ResponseData<Article>>{
    return of({
      data : this.articles,
      message: "",
      status : true
    })
  }
}
