import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Bd } from 'src/app/bd.service';
import * as firebase from 'firebase';
import { Progressso } from 'src/app/progresso.service';
import { interval, Observable, Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css'],
})
export class IncluirPublicacaoComponent implements OnInit {
  public email: string;
  private imagem: any;

  public progressoPublicacao: string = 'pendente';
  public porcentagemDeUpload: number;

  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null),
  });

  constructor(private bd: Bd, private progresso: Progressso) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {
    this.bd.publicar({
      imagem: this.imagem[0],
      email: this.email,
      titulo: this.formulario.get('titulo').value,
    });

    let acompanhamentoUpload = interval(1500);

    let continua = new Subject<boolean>();
    continua.next(true);

    acompanhamentoUpload.pipe(takeUntil(continua)).subscribe(() => {
      this.progressoPublicacao = 'andamento';

      this.porcentagemDeUpload = Math.round(
        (this.progresso.estado.bytesTransferred /
          this.progresso.estado.totalBytes) *
          100
      );

      if (this.progresso.status === 'finalizado') {
        this.progressoPublicacao = 'concluido';
        continua.next(false);
      }
    });
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }
}
