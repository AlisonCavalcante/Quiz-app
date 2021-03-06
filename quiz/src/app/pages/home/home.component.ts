import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { PerguntasService } from 'src/app/services/perguntas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  perguntas!: any[];
  pergunta!: any;
  pontos: number = 0;
  time: number = 10;
  userName: string = '';
  finish: boolean = false;
  perguntaCorrente: number = 0;
  totalPerguntas!: number;
  interval$!: any;
  progresso!: string;

  constructor(private perguntasService: PerguntasService) {}

  ngOnInit(): void {
    this.perguntasService.get().subscribe((res) => {
      this.perguntas = res;
      this.totalPerguntas = this.perguntas.length;
      this.getPerguntaAleatoria();
    });
    this.initTimer();
    this.getUser();
  }

  getPerguntaAleatoria() {
    let random = Math.floor(Math.random() * (this.perguntas.length - 0)) + 0;
    this.pergunta = this.perguntas[random];
    this.perguntas.splice(random, 1);
    this.perguntaCorrente++;
  }

  validarResposta(opcaoCorreta: boolean) {
    if (opcaoCorreta) {
      this.pontos += 10;
      this.timerProximaPergunta();
    } else {
      if (this.pontos > 0) {
        this.pontos -= 10;
      }
      this.timerProximaPergunta();
    }
  }

  timerProximaPergunta(){
    setTimeout(() => {
      this.proximaPergunta();
    }, 1000);
  }

  proximaPergunta() {
    if (this.perguntas.length != 0) {
      this.resetTimer();
      this.getProgress();
      this.getPerguntaAleatoria();
    } else {
      this.finish = true;
      this.stopTimer();
    }
  }

  initTimer() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.time -= 1;
      if (this.time === 0) {
        this.time = 10;
        this.proximaPergunta();
        if (this.pontos > 0) {
          this.pontos -= 10;
        }
      }
    });
   this.finishSessaoPerguntas();
  }

  finishSessaoPerguntas(){
    setTimeout(() => {
      this.interval$.unsubscribe();
      this.finish = true;
    }, 6000000);
  }

  stopTimer() {
    this.interval$.unsubscribe();
    this.time = 0;
  }

  resetTimer() {
    this.stopTimer();
    this.time = 10;
    this.initTimer();
  }

  getUser() {
    this.userName = localStorage.getItem('name')!;
  }

  getProgress(): string{

    this.progresso = ((this.perguntaCorrente / this.totalPerguntas)*100).toString();
    console.log(this.progresso);
    return this.progresso;
  }
}
