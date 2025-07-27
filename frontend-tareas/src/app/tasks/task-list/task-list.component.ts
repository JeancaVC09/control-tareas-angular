import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tareas: Task[] = [];
  cargando = true;
  error = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.taskService.obtenerTareas().subscribe({
      next: (data) => {
        this.tareas = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar tareas';
        this.cargando = false;
      },
    });
  }

  eliminarTarea(id?: string) {
    if (!id) return;
    this.taskService.eliminarTarea(id).subscribe(() => {
      this.tareas = this.tareas.filter((t) => t._id !== id);
    });
  }
}
