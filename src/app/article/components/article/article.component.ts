import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article';
import { Menu } from 'src/app/shared/interfaces/menu';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
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
export class ArticleComponent implements OnInit {

   menuForCarousel : Menu[] = [
    {
      libelle : "menu 1",
      articles : [
            {
            libelle : "article 1",
            montant : 3000
            },
            {
              libelle : "article 2",
              montant : 3000
            },
            {
              libelle : "article 5",
              montant : 3000
              }
      ]
    },
    {
      libelle : "menu 2",
      articles : [
        {
        libelle : "article 2",
        montant : 3000
        },
        {
          libelle : "article 8",
          montant : 3000
        },
        {
          libelle : "article 3",
          montant : 3000
        }
    ]
    },
    {
      libelle : "menu 3",
      articles : [{
        libelle : "article 3",
        montant : 3000
      }]
    },
];

  listeArticles : Article[] = [];
  currentMenuIndex : number = 0;
  stateToAnimate : string = "active";

constructor(private articleService : ArticleService){

}
 ngOnInit(): void {
    this.mooveCarousele();
    this.articleService.getArticle().subscribe({
      next : (value)=>{
        if(value.status){
          this.listeArticles = value.data;
        }
      },
      error : (err) =>{
        console.log(err);
      },
      complete : () => {

      }
      
    })
  }
  
  displayOtherMenu(value : string){
      if(value == '-1'){
        this.currentMenuIndex = this.currentMenuIndex == 0 ? this.menuForCarousel.length - 1 : this.currentMenuIndex - 1;
      }
      else{
        this.currentMenuIndex = this.currentMenuIndex == this.menuForCarousel.length - 1 ? 0 : this.currentMenuIndex + 1;
      }
  }

  mooveCarousele(){
    setInterval(() =>{
      if(this.currentMenuIndex == this.menuForCarousel.length - 1){
        this.currentMenuIndex = 0;
      }
      else{
        this.currentMenuIndex++;
      }
    }, 4000)
  }

  openSearhInput(inputBox : any){
    inputBox.classList.add('open');
  }
  closeSearhInput(inputBox : any){
    inputBox.classList.remove('open');
  }

}
