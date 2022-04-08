import { CadastroPage } from './../pages/cadastro/cadastro';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  pages: Array<{title: string, component: any}>

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    this.initializeApp()

    this.pages = [
      { title: 'Lista de Cadastros', component: HomePage },
      { title: 'Cadastro', component: CadastroPage }
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

