import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Autenticacao } from 'src/app/autenticacao.service';

import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers:[Autenticacao]
})
export class CadastroComponent implements OnInit {
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter();

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null),
    nome_completo: new FormControl(null),
    nome_usuario: new FormControl(null),
    senha: new FormControl(null),
  });
  constructor(private authService: Autenticacao) {}

  ngOnInit(): void {}

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    this.authService.cadastrarUsuario(
      new Usuario(
        this.formulario.value.email,
        this.formulario.value.nome_completo,
        this.formulario.value.senha,
        this.formulario.value.nome_usuario
      )
    ).then(()=> this.exibirPainelLogin())

  }
}
