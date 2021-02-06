import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
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
    ]),
    trigger('animation-painel',[
      state('criado',style({
      opacity:1
    })),
    transition('void=>criado',[
      style({opacity:0, transform: 'translate(50px,0px)'}),
      //0 void------X--------------------x--x--x----------criado1.5s
      animate('1.5s 0s ease-in-out',
      keyframes([
        style({offset:0.15, opacity:1,transform:'translateX(0)'}),
        style({offset:0.86, opacity:1,transform:'translateX(0)'}),
        
        style({offset:0.88, opacity:1,transform:'translateY(-10px)'}),
        style({offset:0.90, opacity:1,transform:'translateY(10px)'}),
        
        style({offset:0.92, opacity:1,transform:'translateY(-10px)'}),
        
        style({offset:0.94, opacity:1,transform:'translateY(10px)'}),
        
        style({offset:0.96, opacity:1,transform:'translateY(-10px)'}),
        style({offset:0.98, opacity:1,transform:'translateY(10px)'}),
      ]))
    ])
  ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner = 'criado';
  public estadoPainel = 'criado';
  public cadastro = false;
   constructor() { }

  ngOnInit(): void {
  }

  public exibirPainel(eventValue:string):void{
    this.cadastro = eventValue === 'cadastro' ? true : false;
  }

  public inicioAnimacao():void{
    console.log('inicio da animacao');
  }

  
  public fimAnimacao():void{
    console.log('Fim da animacao');
  }
}
