import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id: string;
  nombre: string;
  email: string;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4000/api/users';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
