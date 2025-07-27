import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  _id?: string;
  titulo: string;
  descripcion?: string;
  estado?: 'pendiente' | 'en progreso' | 'completada';
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:4000/api/tasks';

  constructor(private http: HttpClient) {}

  obtenerTareas(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  crearTarea(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  actualizarTarea(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  eliminarTarea(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
