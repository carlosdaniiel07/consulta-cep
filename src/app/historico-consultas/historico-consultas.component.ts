import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Historico } from '../historico.model';

@Component({
  selector: 'app-historico-consultas',
  templateUrl: './historico-consultas.component.html'
})
export class HistoricoConsultasComponent implements OnInit {

  @Input() historico: Historico[]
  @Output() reproduzirConsultaEvent = new EventEmitter<Historico>()

  constructor() { }

  ngOnInit() {

  }

  reproduzirConsulta(historico: Historico): void {
    this.reproduzirConsultaEvent.emit(historico)
  }
}
