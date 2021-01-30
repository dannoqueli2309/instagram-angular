import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Imagem } from './imagem.model'
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state(
        'escondido',
        style({
          opacity: 0,
        })),
      state(
        'visivel',
        style({
          opacity: 1,
        })),
        // Esse sintaxe(<=>) é usado para mudar a transição de visivel para escondido e vice e versa 
        transition('escondido <=> visivel', animate('1s ease-in'))
    ]),
  ],
})
export class BannerComponent implements OnInit {
  public estado: string = 'visivel';
  
  public imagens:Imagem[] = [
    {estado:'visivel', url:'/assets/banner-acesso/img_1.png'},
    {estado:'escondido', url:'/assets/banner-acesso/img_2.png'},
    {estado:'escondido', url:'/assets/banner-acesso/img_3.png'},
    {estado:'escondido', url:'/assets/banner-acesso/img_4.png'},
    {estado:'escondido', url:'/assets/banner-acesso/img_5.png'},
  ];

  constructor() {}

  ngOnInit(): void {
    setTimeout(()=>this.logicaRotação(),3000);
  }

  public logicaRotação(): void{
    let idx: number;

    // ocutar imagem
    for(let i: number=0; i<=4;i++){
      if(this.imagens[i].estado == 'visivel'){
        this.imagens[i].estado = 'escondido';
        idx = i === 4 ? 0 : i+1;
        break;
      }
    }
    // exibir imagem
      this.imagens[idx].estado = 'visivel'
    setTimeout(()=>this.logicaRotação(),3000);
  }

}
