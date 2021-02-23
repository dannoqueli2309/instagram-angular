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
    console.log(emailUsuario);

    firebase
      .database()
      .ref(`publicacao/${btoa(emailUsuario)}`)
      .once('value')
      .then((snapshot: any) => {
        //console.log(snapshot.val());

        let publicacoes: Array<any> = [];

        snapshot.forEach((childSnaphot: any) => {
          let publicacao = childSnaphot.val();

          firebase
            .storage()
            .ref()
            .child(`imagens/${childSnaphot.key}`)
            .getDownloadURL()
            .then((url: string) => {
              publicacao.url_imagem = url;
              publicacoes.push(publicacao);
            });
        });
        console.log(publicacoes);
      });
  }
}
