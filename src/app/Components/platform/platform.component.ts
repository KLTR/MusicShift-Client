import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ApiService} from './../../services/api.service';
import {AuthService} from './../../services/auth.service';
import {SpotifyService} from './spotify.service';
import Popup from '../../shared/popup';
import {getPlaylists, getTracks} from './stubData';

@Component({
    selector: 'app-platform',
    templateUrl: './platform.component.html',
    styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {
    platformPlaylists = null;
    playlistTracks = null;
    url: string = '';
    user;
    socket = io.connect('localhost:8080');

    constructor(
        public spotifyService: SpotifyService,
        private router: Router,
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.user = this.authService.getUser();

        //When server finish adding playlists to Db call this funciton.
        this.socket.on('spotify_playlists', (data) => {
            this.spotifyService.getPlaylistsFromDb(this.user.uid).subscribe(
                (spotify_playlists) => {
                    this.platformPlaylists = spotify_playlists;
                },
                (err) => {
                    console.error(err);
                },
                () => console.log('playlists ready')
            );
        });

        // this.platformPlaylists = getPlaylists();
        // this.playlistTracks = getTracks();
    }

    ngOnInit() {
        this.getSpotifyPlaylists();
    }

    pickSource(platformName) {
        this.authorize(platformName);
    }

    authorize(platformName) {
        this.spotifyService.getPlaylistsFromSptoify().subscribe(data => {
            const url = `${data}${this.user.uid}`;

            const options = {
                url,
                popupName: `Authorize ${platformName}`
            };

            Popup(options);
        });
    }

    addUserToSocket() {
        this.socket.emit('auth', this.user.uid);
    }

    getSpotifyPlaylists() {
        this.addUserToSocket();
    }

    getPlaylistTracks(playlist) {
        const spotify_user_id = playlist.owner.id;
        const uid = this.user.uid;

        this.spotifyService.getPlaylistTracks(playlist.id, spotify_user_id, uid)
            .subscribe(data => {
                console.log(data);
            });
    }
}
