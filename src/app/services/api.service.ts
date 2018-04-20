import { Observable } from 'rxjs/Observable';
import { Track } from '../models/track';
import { Playlist } from '../models/playlist';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class ApiService {
    user: User;
    playlists: [Playlist];

    constructor(private http: HttpClient) { }


}
