
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject  } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Login } from '../interfaces/login.interface';
import { Register } from '../interfaces/register.interface';
import { RequestCode , CodeVerify } from '../interfaces/recover-pass.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private readonly CURRENT_USER_KEY = 'aio-token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

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
            localStorage.setItem(this.CURRENT_USER_KEY, response.token);
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
  verifyCode(codeVerify: CodeVerify): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/auth/verify-code`, { resetCode: codeVerify.codeStr  }, {
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
    return this.http.patch<any>(`${this.apiUrl}/auth/reset-password`, 
      { resetCode: code, newPassword: newPassword },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .pipe(
      map(response => ({
        success: response?.success || false,
        message: response?.message || 'Error desconocido al restablecer la contraseña'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al restablecer la contraseña:', error.message, error);
        return of({
          success: false,
          message: error.error?.message || 'Error desconocido al restablecer la contraseña'
        });
      })
    );
  }
  

  // Obtener el perfil del usuario actual

  // Cerrar sesión
  logout(): Observable<boolean> {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false); // Actualiza el estado de autenticación
    return of(true);
  }

  // Verificar si el usuario está autenticado
    private checkToken(): boolean {
      return !!localStorage.getItem(this.CURRENT_USER_KEY);
    }

  // Obtener el token del usuario actual
  getCurrentUserToken(): string | null {
    return localStorage.getItem(this.CURRENT_USER_KEY);
  }
}
