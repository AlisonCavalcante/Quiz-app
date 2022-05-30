import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerguntasService } from 'src/app/services/perguntas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  perguntas!: any[];
  pergunta!: any;
  index!: number;
  pontos: number = 0;
  time: number = 10;
  userName: string = '';
  finish: boolean = false;
  constructor(
    private perguntasService: PerguntasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.perguntasService.get().subscribe((res) => {
      this.perguntas = res;
      this.getPerguntaAleatoria();
    });
    this.initTime();
    this.getUser();
  }

  getPerguntaAleatoria() {
    this.index = this.perguntas.length;
    let random = Math.floor(Math.random() * (this.index - 0)) + 0;
    this.pergunta = this.perguntas[random];
    this.perguntas.splice(random, 1);
  }

  validarResposta(opcaoCorreta: string, resposta: string) {
    if (resposta == opcaoCorreta) {
      this.pontos += 10;
      this.proximaPergunta();
    } else if (resposta != opcaoCorreta) {
      this.proximaPergunta();
      if (this.pontos > 0) {
        this.pontos -= 10;
      }
    }
  }

  proximaPergunta() {
    if (this.perguntas.length != 0) {
      this.getPerguntaAleatoria();
      this.initTime();
    } else {
      this.finish = true;
    }
  }

  initTime() {
    if (this.time > 0) {
      setTimeout(() => {
        this.time -= 1;
        this.initTime();
      }, 1000);
    } else {
      this.time = 10;
      this.proximaPergunta();
    }
  }

  getUser() {
    this.userName = localStorage.getItem('name')!;
  }
}
