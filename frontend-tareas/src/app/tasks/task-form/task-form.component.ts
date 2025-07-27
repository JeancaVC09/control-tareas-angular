import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  tarea: Task = { titulo: '', descripcion: '', estado: 'pendiente' };
  editando = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.taskService.obtenerTareas().subscribe((tareas) => {
        const tareaEncontrada = tareas.find((t) => t._id === id);
        if (tareaEncontrada) this.tarea = tareaEncontrada;
      });
    }
  }

  guardar() {
    if (this.editando && this.tarea._id) {
      this.taskService.actualizarTarea(this.tarea._id, this.tarea).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.crearTarea(this.tarea).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
