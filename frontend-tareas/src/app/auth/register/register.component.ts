import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  rol = 'user';
  error = '';
  mensaje = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    this.authService
      .registrar({ nombre: this.nombre, email: this.email, password: this.password, rol: this.rol })
      .subscribe({
        next: () => {
          this.mensaje = 'Registro exitoso. Ahora puedes iniciar sesión.';
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: (err) => {
          this.error = err.error?.message || 'Error al registrar usuario';
        },
      });
  }
}
