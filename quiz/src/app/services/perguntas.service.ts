import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerguntasService {

  constructor(private http: HttpClient) { }

  get(): Observable<any>{
    return this.http.get('http://localhost:3001/perguntas')
  }
}
