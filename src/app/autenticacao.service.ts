import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class Autenticacao {
  public token_id: string;

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    console.log('chegamos aqui', usuario);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {
        // remove senha do atributo senha do usuario
        delete usuario.senha;

        firebase
          .database()
          .ref(`usuario_detalhes/${btoa(usuario.email)}`)
          .set({ usuario });
        console.log(resposta);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }
  public autenticar(email: string, senha: string): void {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then((resposta) => {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((idToken) => {
            this.token_id = idToken;
            console.log(this.token_id);
          });
      })
      .catch((error) => console.log('O Erro é', error));
  }
}
