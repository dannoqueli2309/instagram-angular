import * as firebase from 'firebase';

export class Bd {
  public publicar(publicacao: any): void {
    console.log('Valor da publicacao', publicacao);
    firebase
      .database()
      .ref(`publicacao/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo });
    console.log('Chegamos até o serviço responsavel pelo controle de dados');
  }
}
