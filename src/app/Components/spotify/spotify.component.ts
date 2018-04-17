import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from './spotify.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {
spotifyPlaylists;
url: string = "";
user ;
socket = io.connect('localhost:8080');
  constructor(
    public spotifyService: SpotifyService,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,

  ) {
    this.user = this.authService.getUser();

    //When server finish adding playlists to Db call this funciton.
    this.socket.on('spotify_playlists',(data) =>{
      this.spotifyService.getPlaylistsFromDb(this.user.uid).subscribe(
        spotify_playlists => { this.spotifyPlaylists = spotify_playlists },
        err =>{ console.error(err)},
        () => console.log('playlists ready')
      )
    });
   }
  
  ngOnInit() {
    
  }

   
//Add this user to sockets array in server.
 addUserToSocket() {
  this.socket.emit('auth',this.user.uid)
 }
  //get playlist button
  getSpotifyPlaylists(){
    this.addUserToSocket();
    this.spotifyService.getPlaylistsFromSptoify().subscribe(data =>{
      console.log(data);
      console.log(this.user.uid);
      this.url = `${data}${this.user.uid}`;
      console.log(this.url);
      // this.url = data;
      window.open(this.url,"_blank");
      
    })
};

getPlaylistTracks(playlist){
  let spotify_user_id = playlist.owner.id;
  let uid = this.user.uid;
  this.spotifyService.getPlaylistTracks(playlist.id, spotify_user_id,uid).subscribe(data => {
    console.log(data);
  })
}

// End //
}
