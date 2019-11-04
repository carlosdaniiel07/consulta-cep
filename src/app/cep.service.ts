import { Injectable, EventEmitter, Output } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { Cep } from './cep.model'
import { Historico } from './historico.model'

@Injectable()
export class CepService {
    apiEndpoint: string = 'https://viacep.com.br/ws/$cep/json'

    constructor(private httpClient: HttpClient) {
    }

    /**
     * Busca um CEP na API ViaCEP (https://viacep.com.br)
     * @param cep 
     */
    public buscar(cep: string): Observable<Cep> {
        return this.httpClient.get<Cep>(this.apiEndpoint.replace('$cep', cep))
    }

    /**
     * Grava histórico de consulta
     */
    public gravaHistorico(cep: string, erro: boolean): void {
        let historicoAtual: Historico[] = JSON.parse(localStorage.getItem('historico'))

        historicoAtual = (historicoAtual === null) ? [] : historicoAtual

        historicoAtual.push({
            cep: cep,
            data: new Date().toJSON(),
            erro: erro
        })

        localStorage.setItem('historico', JSON.stringify(historicoAtual))
    }

    /**
     * Retorna o histórico de consultas
     */
    public getHistorico(): Historico[] {
        let historicoAtual: Historico[] = JSON.parse(localStorage.getItem('historico'))
        return (historicoAtual === null) ? [] : historicoAtual
    }

    /**
     * Limpa o histórico do Local Storage
     */
    public limpaHistorico(): void {
        localStorage.removeItem('historico')
    }
}