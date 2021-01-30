import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations:[
    trigger('animacao-banner',[
      state('criado',style({
        opacity:1
      })),
      transition('void=>criado',[
        style({opacity:0, transform: 'translate(-50px,0px)'}),
        animate('500ms 0s ease-in-out'), // duração, delay e aceleração(easy)
      ])
    ])
  ]
})
export class acessoComponent implements OnInit {

  public estadoBanner = 'criado';

  constructor() { }

  ngOnInit(): void {
  }

}
