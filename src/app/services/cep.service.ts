import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CepService {
    private readonly url_base: string = 'https://brasilapi.com.br/api/cep/v2';
    
    constructor() { }
    
    public async buscaEndereco(cep: string): Promise<any> {
        const url = `${this.url_base}/${cep}`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Erro na requisição de busca de endereço.');
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.message);
            }
            
            return data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
