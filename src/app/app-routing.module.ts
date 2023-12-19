import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : "menu",
    loadChildren : ()=> import('./menu/menu.module').then(m => m.MenuModule)
  },
  {
    path : "article",
    loadChildren : ()=> import('./article/article.module').then(m => m.ArticleModule)
  },
  {
    path : "commande",
    loadChildren : ()=> import('../app/commande/commande.module').then(m => m.CommandeModule)
  },
  {
    path : "**",
    redirectTo : "/menu"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
