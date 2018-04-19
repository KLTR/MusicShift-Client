import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    user: Observable<firebase.User>;

    constructor(private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase) {
        this.user = firebaseAuth.authState;
    }

    signup(email: string, password: string) {
        this.firebaseAuth
            .auth
            .createUserWithEmailAndPassword(email, password)
            .then(value => {
                console.log('Success!', value);

                // Add user to DB
                const user: User = {
                    name : value.displayName,
                    email : value.email ,
                    uid : value.uid ,
                    img : '' ,
                    playLists: null
                };

                // Create user and cookie with uid
                document.cookie = `mshift_uid=${user.uid}`;
                this.db.database.ref(`users/${user.uid}`).update(user);
            })
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
    }

    login(email: string, password: string) {
        this.firebaseAuth
            .auth
            .signInWithEmailAndPassword(email, password)
            .then(value => {
                const user: User = {
                    name : value.displayName,
                    email : value.email ,
                    uid : value.uid ,
                    img : '' ,
                    playLists: null
                };
            })
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
    }

    getUser() {
        return this.firebaseAuth.auth.currentUser;
    }

    logout() {
        this.firebaseAuth.auth.signOut();
    }
}
