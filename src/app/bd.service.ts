import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progressso } from './progresso.service';

@Injectable()
export class Bd {
  constructor(private progresso: Progressso) {}
  public publicar(publicacao: any): void {
    firebase
      .database()
      .ref(`publicacao/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((resposta: any) => {
        console.log(resposta);

        let nomeImagem = resposta.key;

        firebase
          .storage()
          .ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => {
              /// Acompanhar  o processo de Upload.
              this.progresso.status = 'andamento';
              this.progresso.estado = snapshot;
            },
            (error) => {
              /// Caso ajá um erro no upload
              this.progresso.status = 'erro';
            },
            () => {
              //// Finalização do Processo de upload
              this.progresso.status = 'finalizado';
            }
          );
      });
  }
  public consultaPublicacao(emailUsuario: string): any {
    firebase
      .database()
      .ref(`publicacoes/${btoa(emailUsuario)}`)
      .once('value')
      .then((snapshot: any) => {
        console.log(snapshot.val());
      });
  }
}
