import { Component, OnInit } from '@angular/core';

import *as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'instagram-app';
  ngOnInit(): void {
    var firebaseConfig = {
      apiKey: "AIzaSyAV-vdPDkVd-n1A96zPCfkqtUKUi-NAAu0",
      authDomain: "jta-instagram-clone-cf59a.firebaseapp.com",
      projectId: "jta-instagram-clone-cf59a",
      storageBucket: "jta-instagram-clone-cf59a.appspot.com",
      messagingSenderId: "919126641143",
      appId: "1:919126641143:web:55ac41a4467945134306f2",
      measurementId: "G-57QZQ4NMXX",
      databaseURL:"https://jta-instagram-clone-cf59a-default-rtdb.firebaseio.com/"
    };

    firebase.initializeApp(firebaseConfig);
  }
}
