import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Login } from '../interfaces/login.interface';
import { Register } from '../interfaces/register.interface';
import { UserProfile } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private readonly CURRENT_USER_Key = 'current-user';

  constructor(private http: HttpClient) { }

  // Registrar un nuevo usuario
  register(newUser: Register): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/register`, newUser)
      .pipe(
        map(response => response.success),
        catchError(() => of(false))
      );
  }

  // Iniciar sesión
  login(login: Login): Observable<boolean> {

    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, login)
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem(this.CURRENT_USER_Key, response.token);
            return true;
          } else {
            return false;
          }
        }),
        catchError(() => of(false))
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
