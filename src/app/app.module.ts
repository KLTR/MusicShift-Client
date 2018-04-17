import { SpotifyService } from './Components/spotify/spotify.service';
// import { environment } from './../environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import  {RouterModule, Routes } from '@angular/router'
import  {environment} from '../environments/environment';
import { AppComponent } from './app.component';
// firebase stuff
import * as firebase from 'firebase';
import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SpotifyComponent } from './Components/spotify/spotify.component';
import { AppleComponent } from './Components/apple/apple.component';
import { YoutubeComponent } from './Components/youtube/youtube.component';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
// routes

const appRoutes: Routes = [
  {path: '',component: AppComponent}  

]
// firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    SpotifyComponent,
    AppleComponent,
    YoutubeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'musicshift'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [ApiService,AuthService,SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
