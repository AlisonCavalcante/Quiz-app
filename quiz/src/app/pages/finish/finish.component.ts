import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {

  @Input() pontuacaoFinal!: number;
  @Input() usuario!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
