import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article';

@Component({
  selector: 'app-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss']
})
export class CardArticleComponent {
  @Input() article : Article = <Article>{};
  @Output() artcleIdToDisplay = new EventEmitter<number>();



  displayArticleById(id : number){
    // console.log(id);
    this.artcleIdToDisplay.emit(id);
  }
}
