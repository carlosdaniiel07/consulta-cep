import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import Swal from 'sweetalert2'

import { CepService } from './cep.service'

import { Cep } from './cep.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  form: FormGroup
  cepRecuperado: Cep = null

  constructor(private fb: FormBuilder, private cepService: CepService) {
    this.initForm();
  }

  // Init the form
  initForm(): void {
    this.form = this.fb.group({
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    })
  }

  // Método responsável por buscar um CEP na API
  buscarCep(): void {
    if(this.form.valid){
      this.cepService.buscar(this.cep.value).subscribe((dados: Cep) => {
        if(dados.erro){
          this.onError('Erro', `Não foi possível localizar o CEP informado (${this.cep.value})`)
        } else {
          this.cepRecuperado = dados
          this.cep.reset()
        }
      }, error => this.onError('Erro', 'Ocorreu um erro em sua requisição. Certifique-se de que o CEP esteja em um formato correto.'))
    }
  }

  hasCep(): boolean {
    return this.cepRecuperado !== null
  }

  onError(title: string, message: string): void {
    this.cepRecuperado = null
    
    this.cep.reset()
    Swal.fire(title, message, 'error')
  }

  get cep() { return this.form.get('cep') }
}
