import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';

@Component({
    selector: 'app-exemplo',
    templateUrl: './exemplo.component.html',
    styleUrls: ['./exemplo.component.css']
})
export class ExemploComponent {
    @ViewChild('numero') numero!: ElementRef;
    
    public submitted: boolean = false;
    
    public form: FormGroup = new FormGroup({
        nome: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
        ]),
        cep: new FormControl(''),
        rua: new FormControl(''),
        bairro: new FormControl(''),
        numero: new FormControl('')
    });
    
    constructor(private cepService: CepService) {}
    
    public salvar(): void {
        this.submitted = true;
        if (this.form.valid) {
            console.log(this.form.value);
        } else {
            alert('Preencha todos os campos corretamente.');
        }
    }
    
    public async buscarEndereco(): Promise<void> {
        const { cep } = this.form.value;
        try {
            const response = await this.cepService.buscaEndereco(cep);
            const { neighborhood, street } = response;
            
            this.form.controls['rua'].setValue(street);
            this.form.controls['bairro'].setValue(neighborhood);
            this.numero.nativeElement.focus();
        } catch (error) {
            alert(error);
        }
    }
}
