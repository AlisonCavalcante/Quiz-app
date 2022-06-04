import { Constantes } from './../shared/utils/Constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerguntasService {

  constructor(private http: HttpClient) { }

  get(): Observable<any>{
    return this.http.get(Constantes.URL_PERGUNTAS);
  }
}
