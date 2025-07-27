import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface User {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  registrar(data: { nombre: string; email: string; password: string; rol: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/login`, data).pipe(
      tap((res) => {
        this.token = res.token;
        this.currentUserSubject.next(res.user);
      })
    );
  }

  logout() {
    this.token = null;
    this.currentUserSubject.next(null);
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe();
    this.router.navigate(['/login']);
  }

  getToken() {
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}
