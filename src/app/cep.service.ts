import { Injectable, EventEmitter, Output } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { Cep } from './cep.model'

@Injectable()
export class CepService {
    apiEndpoint: string = 'https://viacep.com.br/ws/$cep/json'

    constructor(private httpClient: HttpClient) {
    }

    // Busca um CEP na API ViaCEP (https://viacep.com.br)
    public buscar(cep: string): Observable<Cep> {
        return this.httpClient.get<Cep>(this.apiEndpoint.replace('$cep', cep))
    }
}