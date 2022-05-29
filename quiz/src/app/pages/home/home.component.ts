import { Component, OnInit } from '@angular/core';
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
  constructor(private perguntasService: PerguntasService) {}

  ngOnInit(): void {
    this.perguntasService.get().subscribe((res) => {
      this.perguntas = res;
      console.log(this.perguntas);
      this.getPerguntaAleatoria();
    });
  }

  getPerguntaAleatoria() {
    this.index = this.perguntas.length;
    let random = Math.floor(Math.random() * (this.index - 0)) + 0;
    this.pergunta = this.perguntas[random];
    console.log(this.pergunta);
  }

  resposta(opcaoCorreta: string, resposta: string) {
    console.log(`Opção Correrta: ${opcaoCorreta}, Resposta do Usuário: ${resposta}`)
  }
}
