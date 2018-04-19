import {BrowserModule} from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SpotifyService} from './Components/platform/spotify.service';
import {ApiService} from './services/api.service';
import {environment} from '../config/environment.dev.js';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './Components/login/login.component';
import {PlatformComponent} from './Components/platform/platform.component';
import * as firebase from 'firebase';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from './services/auth.service';

const appRoutes: Routes = [
	{path: '', component: AppComponent}
];

const declarations = [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PlatformComponent
];

const imports = [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'musicshift'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
];

const providers = [
    ApiService,
    AuthService,
    SpotifyService
];

const bootstrap = [AppComponent];

@NgModule({
	declarations,
	imports,
	providers,
	bootstrap
})
export class AppModule { }
