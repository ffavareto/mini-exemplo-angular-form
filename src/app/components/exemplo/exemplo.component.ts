import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exemplo',
  templateUrl: './exemplo.component.html',
  styleUrls: ['./exemplo.component.css']
})
export class ExemploComponent {
    public submitted: boolean = false;

    public form: FormGroup = new FormGroup({
        nome: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
        ])
    });

    public salvar(): void {
        this.submitted = true;
        if (this.form.valid) {
            const { nome } = this.form.value;
            console.log(nome);
        } else {
            alert('Preencha todos os campos corretamente.');
        }
    }
}
