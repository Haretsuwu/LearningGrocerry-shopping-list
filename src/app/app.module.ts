import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CadastroPage } from './../pages/cadastro/cadastro';
import { CategoryPage } from '../pages/category/category';

import { IonicStorageModule } from '@ionic/storage';
import { StorageServiceProvider } from './../providers/storage-service/storage-service';
import { CategoryStorageServiceProvider } from '../providers/category-storage-service/category-storage-service';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CadastroPage,
    CategoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CadastroPage,
    CategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageServiceProvider,
    CategoryStorageServiceProvider,
    Camera,
    SocialSharing
  ]
})
export class AppModule {}
