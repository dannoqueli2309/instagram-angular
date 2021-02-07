import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Autenticacao } from './autenticacao.service';

// Para retornar Autenticacao Guard devemos sempre implementar a interface CanActivate
///
@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private autenticacao: Autenticacao) {}

  canActivate(): boolean {
    return this.autenticacao.autenticado();
  }
}
