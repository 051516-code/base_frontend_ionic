import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login.interface';
import { Register, User } from '../interfaces/register.interface';
import { Observable , of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

// TODO> Array de usuarios en memoria, inicializado vacío
private users: User[] = [];
 // TODO> Clave para el almacenamiento del token
private readonly User_key = 'users-registered'
private readonly CURRENT_USER_Key = 'current-user';

  constructor() {

    // todo: creamos un array en el storage si no existe
    if(!localStorage.getItem(this.User_key)) {
      localStorage.setItem(this.User_key, JSON.stringify([]));
      
    }
   }

  //TODO>  Obtener todos los usuarios registrados o vacío
  private getUsers(): User[]{
    const users = localStorage.getItem(this.User_key);
    return  users ? JSON.parse(users) : [] ;
  }

  //TODO> Establecer usuarios en el localStorage
  private setUsers(users : User[]) : void {
    localStorage.setItem(this.User_key, JSON.stringify(users))
  }

  // TODO> Registrar un nuevo usuario
  async register(newUser : Register): Promise<boolean> {
    const users = this.getUsers();
    const existingUser = users.find( u => u.email === newUser.email);


    if( existingUser){
      return false; // todo: user exist
    }

    //simular la generacion de un nuevo id de usuario
    const newuserId =  users.length ? Math.max(...users.map( u => u.id)) + 1 : 1;
    
    const user: User = { 
      id: newuserId,
      name: newUser.name,
      email: newUser.email,
      password : newUser.password
    }

    users.push(user);
    this.setUsers(users)

    return true;

  }


  //TODO> Iniciar sesión
 async login(login : Login): Promise<boolean> {

  const { email , password } = login;
  const user = this.getUsers().find(u => u.email === email && u.password === password);

  if(user) {

    localStorage.setItem(this.CURRENT_USER_Key, JSON.stringify(user)); 

    return true;
  }else {
    return false;
  }
 }


  //TODO> Recuperar contraseña: buscar el usuario y simular el envío de un código
  recoverPassword(email: string): boolean {
    const user = this.getUsers().find(u => u.email === email);

    if (user) {
      console.log('Usuario encontrado:', user);
      // Aquí deberías implementar la lógica real para enviar un código al correo del usuario
      this.sendRecoveryCode(email);
      return true; // Usuario encontrado, retorno true
    } else {
      console.log('Usuario no encontrado');
      return false; // Usuario no encontrado, retorno false
    }
  }

    //TODO> Simulación del envío de un código de recuperación por correo electrónico
  private sendRecoveryCode(email: string): void {
      // Implementa la lógica real de envío de correos aquí
      console.log(`Código de recuperación enviado al correo ${email}`);
    }


  // TODO> Restablecer la contraseña
  async ressetPassword(code: string, newPassword: string): Promise<boolean> {

 

   //TODO: actualiza la contrasena
   const users = this.getUsers();
   const email = this.getEmailFromCode(code);
   const userIndex = users.findIndex(u => u.email === email);

   if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    this.setUsers(users);
    return true; // contrasena restablecida

   }else{
    return false;
   }
    
  }

 verifyCode(code: string) {
    // Simula la verificación del código. Reemplaza esto con una llamada real a tu backend.
    // Por ejemplo, podrías hacer una llamada HTTP aquí.
    if (code === '1234') {
      return true // Simula un código válido
    } else {
      return false; // Simula un código inválido
    }
  }

 // Simulación del método para obtener el email del código
private getEmailFromCode(code: string): string {
  // Esta función debe devolver el email asociado con el código de verificación
  // Simulación: solo para propósitos de demostración
  // En una implementación real, se debería buscar en una base de datos o en la lógica adecuada
  // Por ejemplo:
  // return this.codesMap[code]; // Suponiendo que tienes un mapa de códigos a emails
  return 'amdress@gmail.com'; // Valor simulado
}



  //TODO: Logout del user
  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_Key)
  }
  
  //TODO: verifica authtnticacion
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.CURRENT_USER_Key);
  }
  
  whoIm(): string | null {
    return localStorage.getItem(this.CURRENT_USER_Key);
  }
}
