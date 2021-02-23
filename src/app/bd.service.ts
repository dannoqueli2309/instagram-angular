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
  public consultaPublicacao(emailUsuario: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`publicacao/${btoa(emailUsuario)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          let publicacoes: Array<any> = [];

          snapshot.forEach((childSnaphot: any) => {
            let publicacao = childSnaphot.val();
            publicacao.key = childSnaphot.key;

            publicacoes.push(publicacao);
          });

          return publicacoes.reverse();
        })
        .then((publicacoes: any) => {
          // // recuperando a url da imagem
          publicacoes.forEach((publicacao) => {
            firebase
              .storage()
              .ref()
              .child(`imagens/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url_imagem = url;

                ///Recuperando as informacaoes no usuario
                firebase
                  .database()
                  .ref(`usuario_detalhes/${btoa(emailUsuario)}`)
                  .once('value')
                  .then((snapshot: any) => {
                    publicacao.nome_usuario = snapshot.val().usuario.nome_usuario;
                  });
              });
          });
          resolve(publicacoes);
        });
    });
  }
}

//
