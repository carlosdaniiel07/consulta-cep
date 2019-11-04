import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import Swal from 'sweetalert2'

import { CepService } from './cep.service'

import { Cep } from './cep.model';
import { Historico } from './historico.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  form: FormGroup
  cepRecuperado: Cep = null
  isHistoricoVisivel: boolean = false

  constructor(private fb: FormBuilder, private cepService: CepService) {
    this.initForm();
  }

  /**
   * Inicializa formulário
   */
  initForm(): void {
    this.form = this.fb.group({
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    })
  }

  /**
   * Realiza busca de CEP através da camada de serviço
   */
  buscarCep(): void {
    if(this.form.valid) {
      this.cepService.buscar(this.cep.value).subscribe((dados: Cep) => {
        if(dados.erro){
          this.cepService.gravaHistorico(this.cep.value, true)
          this.onError('Erro', `Não foi possível localizar o CEP informado (${this.cep.value})`)
        } else {
          this.cepService.gravaHistorico(this.cep.value, false)
          this.cepRecuperado = dados
          this.cep.reset()
        }
      }, error => this.onError('Erro', 'Ocorreu um erro em sua requisição. Certifique-se de que o CEP esteja em um formato correto.'))
    }
  }

  /**
   * Reproduz uma consulta gravada no histórico
   * @param historico 
   */
  reproduzirConsulta(historico: Historico): void {
    this.cep.setValue(historico.cep)
    this.buscarCep()
  }

  /**
   * Esconde ou mostra o card de dados
   * @param esconder
   */
  esconderCard(esconder: boolean): void {
    if(esconder){      
      this.cepRecuperado = null
    }
  }

  /**
   * Esconde ou mostra histórico de consultas
   */
  exibeHistorico(): void {
    if (this.getHistoricoConsultas().length > 0) {
      this.isHistoricoVisivel = !this.isHistoricoVisivel
    } else {
      this.onWarning('Alerta', 'Ainda não há nenhum histórico de consulta')
    }
  }

  /**
   * Limpa o histórico de consultas
   */
  limpaHistorico(): void {
    this.cepService.limpaHistorico()
    this.onSuccess('Sucesso', 'Histórico removido com sucesso!')
    this.isHistoricoVisivel = false
  }

  /**
   * Retorna o histórico de consultas
   */
  getHistoricoConsultas(): Historico[] {
    return this.cepService.getHistorico()
  }

  /**
   * Retorna true caso haja algum CEP em memória
   */
  hasCep(): boolean {
    return this.cepRecuperado !== null
  }

  /**
   * Exibe uma mensagem de erro e reseta objeto cepRecuperado
   * @param title 
   * @param message 
   */
  onError(title: string, message: string): void {
    this.cepRecuperado = null
    
    this.cep.reset()
    Swal.fire(title, message, 'error')
  }

  /**
   * Exibe uma mensagem de alerta
   * @param title 
   * @param message 
   */
  onWarning(title: string, message: string): void {
    Swal.fire(title, message, 'warning')
  }

  /**
   * Exibe uma mensagem de sucesso
   * @param title 
   * @param message 
   */
  onSuccess(title: string, message: string): void {
    Swal.fire(title, message, 'success')
  }

  get cep() { return this.form.get('cep') }
}
