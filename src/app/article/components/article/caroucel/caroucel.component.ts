import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from 'src/app/shared/interfaces/menu';

@Component({
  selector: 'app-caroucel',
  templateUrl: './caroucel.component.html',
  styleUrls: ['./caroucel.component.scss']
})
export class CaroucelComponent {
  @Input() menu : Menu = <Menu>{};
  @Output() artcleIdToDisplay = new EventEmitter<number>();
  displayArticle(event : number){
    this.artcleIdToDisplay.emit(event);
  }

}
