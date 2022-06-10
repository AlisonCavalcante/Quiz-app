import { IUsuario } from './../../models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit, OnChanges {
  usuarios!: IUsuario[];
  user: IUsuario = {
    nome: '',
    pontos: 0,
  };
  @Input() usuarioAtivo!: string;
  @Input() pontuacao!: number;
  @Input() finishGame!: boolean;
  constructor(private userService: UsuariosService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((usuarios) => {
      this.usuarios = usuarios.sort((a, b) => {
        if (a && b) {
          if (a.pontos > b.pontos) {
            return -1;
          }
        }
        return 0;
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.finishGame) {
      this.verifyInsertRanking();
    }
  }

  verifyInsertRanking() {
    let cont = 0;
    this.usuarios.map((user: any, index) => {
      if (this.pontuacao > user.pontos && cont == 0) {
        cont++;
        this.user.nome = this.usuarioAtivo;
        this.user.pontos = this.pontuacao;
        this.usuarios.splice(index, 0, this.user);
        this.usuarios = this.alterarRanking(this.user);
        this.usuarios.splice(-1, 1);
        return;
      }
    });
  }

  alterarRanking(user: IUsuario): IUsuario[] {
    const usariosFilterPontos = this.ordenarRanking(true, this.usuarios);
    if (usariosFilterPontos[0].id) {
      this.userService
        .deleteUser(usariosFilterPontos[0].id)
        .subscribe((res) => {
          this.userService.create(user).subscribe((res) => console.log(res));
        });
    }
    const usuarioFilterOrdemDesc = this.ordenarRanking(false, this.usuarios);
    return usuarioFilterOrdemDesc;
  }

  ordenarRanking(crescente: boolean, usuarios: IUsuario[]): IUsuario[] {
    let usariosFiltrados = [];
    if (crescente) {
      usariosFiltrados = usuarios.sort((a, b) => {
        if (a && b) {
          if (a.pontos < b.pontos) {
            return -1;
          }
        }
        return 0;
      });
    } else {
      usariosFiltrados = usuarios.sort((a, b) => {
        if (a && b) {
          if (a.pontos > b.pontos) {
            return -1;
          }
        }
        return 0;
      });
    }
    return usariosFiltrados;
  }
}
