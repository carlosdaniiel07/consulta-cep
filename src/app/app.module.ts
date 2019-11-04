import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from "@angular/forms"

// ng-Bootstrap module
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// ngx-mask module
import { NgxMaskModule } from 'ngx-mask'

import { CepService } from './cep.service'

import { AppComponent } from './app.component';
import { CepCardComponent } from './cep-card/cep-card.component';
import { HistoricoConsultasComponent } from './historico-consultas/historico-consultas.component';

@NgModule({
  declarations: [
    AppComponent,
    CepCardComponent,
    HistoricoConsultasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ CepService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
