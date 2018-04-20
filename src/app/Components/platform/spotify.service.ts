import {Injectable, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {
    AngularFireDatabase,
    AngularFireList,
    AngularFireObject
} from 'angularfire2/database';
import 'rxjs/add/operator/map';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SpotifyService {
    authToken: any;
    user: any;
    baseUrl = 'http://localhost:8080/spotify';

    constructor(private http: HttpClient, public db: AngularFireDatabase) {}

    getPlaylistsFromSptoify() {
        return this.http.get(this.baseUrl);
    }

    getPlaylistTracks(playlist_id, spotify_user_id, uid) {
        const config = {
            params : {
                playlist_id,
                spotify_user_id,
                uid
            }
        };

        return this.http.get(`${this.baseUrl}/tracks`, config);
    }

    getPlaylistsFromDb(uid) {
        return this.db.list(`users/${uid}/spotify`).valueChanges();
    }
}
