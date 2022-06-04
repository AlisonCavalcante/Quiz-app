import { IUsuario } from './../../shared/models/usuario';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {


 @ViewChild('name') userName!: ElementRef;

  usuario: IUsuario = {
    nome: '',
    pontos: 0
  }
  usuarioExist: boolean = false;
  subscripton!: Subscription;
  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  startQuiz(){
    localStorage.setItem("name", this.userName.nativeElement.value);
    this.usuario.nome = this.userName.nativeElement.value;

    this.usuariosService.getUser(this.usuario).subscribe((res: any) =>{
      if(res.length !== 0) {
       alert('Usuário Já existe!!!');
      } else if(this.usuario.nome !== '') {
        this.usuariosService.create(this.usuario).subscribe((res) =>{
          console.log(res);
          this.router.navigate(['/home'])
        });
      } else {
        this.router.navigate(['/home']);
      }
    })

  }


}
