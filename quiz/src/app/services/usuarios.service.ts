import { Constantes } from './../shared/utils/Constantes';
import { Observable, take, tap } from 'rxjs';
import { IUsuario } from './../shared/models/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  create(user: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(Constantes.URL_USUARIOS, user).pipe(
      take(1)
    )
  }

  getUsers(): Observable<IUsuario[]>{
    return this.http.get<IUsuario[]>(Constantes.URL_USUARIOS);
  }

  getUser(user: IUsuario): Observable<IUsuario>{
    return this.http.get<IUsuario>(Constantes.URL_USUARIOS + `${'?nome='}${user.nome}`).pipe(
      take(1)
    )
  }

  updateUser(user: IUsuario): Observable<IUsuario>{
      return this.http.patch<IUsuario>(Constantes.URL_USUARIOS + `${ user.id}`, user);
  }
  deleteUser(id: number): Observable<IUsuario>{
    return this.http.delete<IUsuario>(Constantes.URL_USUARIOS + `/${id}`)
  }
}
