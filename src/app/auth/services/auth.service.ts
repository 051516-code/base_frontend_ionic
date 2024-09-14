import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Login } from '../interfaces/login.interface';
import { Register } from '../interfaces/register.interface';
import { UserProfile } from '../interfaces/user.interface';
import { RequestCode , CodeVeryfy } from '../interfaces/recover-pass.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private readonly CURRENT_USER_Key = 'aio-token';

  constructor(private http: HttpClient) { }

  // TODO: Registrar un nuevo usuario
  register(newUser: Register): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/auth/register`, newUser, {

      headers: {
        'Content-Type': 'application/json'
      }
    })
    .pipe(
      map(response => response),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud de registro:', error);
        return of({ success: false, message: error.error.message || 'Error desconocido' });
      })
    );
  }



  // TODO : Iniciar sesión
  login(login: Login): Observable<{ token: string }> {

    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, login)
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem(this.CURRENT_USER_Key, response.token);
          }
          return response; // Devuelve el objeto completo con el token
        }),
        catchError(() => of({ token: '' })) // Maneja el error devolviendo un objeto con un token vacío
      );
  }



  // TODO : solicita codigo de redefinir senha
  requestCode(requestCode: RequestCode): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/send-reset-code`, requestCode, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .pipe(
      map(response => {
        // Procesar y devolver solo lo necesario de la respuesta
        return {
          success: response.success,
          message: response.message
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud desde frontend:', error);
        // Devolver una respuesta estándar en caso de error
        return of({
          success: false,
          message: error.error.message || 'Error desconocido al enviar el código de restablecimiento'
        });
      })
    );
  }


  
  // TODO : verifica codigo de redefinir senha
  verifyCode(code: CodeVeryfy): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/verify-code`, { resetCode: code }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .pipe(
      map(response => {
        return {
          success: response.success,
          message: response.message
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al verificar el código:', error);
        return of({
          success: false,
          message: error.error.message || 'Error desconocido al verificar el código'
        });
      })
    );
  }
  


  // Método para restablecer la contraseña
  resetPassword(code: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/reset-password`, { resetCode: code, newPassword: newPassword }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .pipe(
      map(response => ({
        success: response.success,
        message: response.message
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al restablecer la contraseña:', error);
        return of({
          success: false,
          message: error.error.message || 'Error desconocido al restablecer la contraseña'
        });
      })
    );
  }











  

  // Obtener el perfil del usuario actual
  getUserProfile(): Observable<UserProfile | null> {
    const token = localStorage.getItem(this.CURRENT_USER_Key);
    if (token) {
      return this.http.get<UserProfile>(`${this.apiUrl}/profile`).pipe(
        catchError(() => of(null))
      );
    }
    return of(null);
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_Key);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.CURRENT_USER_Key);
  }

  // Obtener el token del usuario actual
  getCurrentUserToken(): string | null {
    return localStorage.getItem(this.CURRENT_USER_Key);
  }
}
