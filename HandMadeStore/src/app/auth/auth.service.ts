import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private hasLoggedIn$ = new BehaviorSubject<boolean>(false);

    url = 'http://localhost:3000/users';
    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }
    setHasLoggedIn(hasLogged: boolean): void {
        this.hasLoggedIn$.next(hasLogged);
    }
    getHasLoggedIn(): Observable<boolean> {
        if (this.getLoggedUser()) {
            return of(true);
        }

        return this.hasLoggedIn$.asObservable();
    }

    login(email: string, password: string): Observable<User> {
        return this.getUsers().pipe(
          map((stream: User[]) => stream.find(user => user.email === email && user.password === password))
        );
      }
    register(data: User): Observable<User> {
        return this.http.post<User>(this.url, data);
    }
    logOut(): void {
        localStorage.removeItem('loggedUser');

        this.setHasLoggedIn(false);
    }
    setLoggedUser(user: User): void {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        this.setHasLoggedIn(true);
    }
    getLoggedUser(): User {
        return JSON.parse(localStorage.getItem('loggedUser'));
    }
}