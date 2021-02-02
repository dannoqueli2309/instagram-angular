import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class Autenticacao {
  public cadastrarUsuario(usuario: Usuario): void {
    console.log('chegamos aqui', usuario);
    firebase
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
    firebase.auth().signInWithEmailAndPassword(email,senha)
    .then((resposta)=>console.log(resposta))
    .catch((error)=>console.log("O Erro é",error))
  }
}
