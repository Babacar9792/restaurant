import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './components/article/article.component';
import { SharedModule } from '../shared/shared.module';
import { CaroucelComponent } from './components/article/caroucel/caroucel.component';
import { CardArticleComponent } from '../shared/card-article/card-article.component';


@NgModule({
  declarations: [
    ArticleComponent,
    CaroucelComponent,
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule
  ]
})
export class ArticleModule { }
