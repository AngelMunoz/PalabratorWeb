import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { SignupPayload } from '../interfaces/AuthTypes';


function regexValidator(regex: RegExp): ValidatorFn {
  return (control: AbstractControl) => {
    const password = control.value;
    const isValid = regex.test(password);
    return isValid ? null : { invalidPassword: true }
  }
}

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  @Output() onSignup: EventEmitter<SignupPayload> = new EventEmitter();

  signupForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    correo: new FormControl('', { validators: [Validators.required], asyncValidators: [] }),
    usuario: new FormControl('', { validators: [Validators.required], asyncValidators: [] }),
    contrasena: new FormControl('', [Validators.required, regexValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
  });

  get nombre() {
    return this.signupForm.get('nombre');
  }

  get apellidos() {
    return this.signupForm.get('apellidos');
  }

  get correo() {
    return this.signupForm.get('correo');
  }

  get usuario() {
    return this.signupForm.get('usuario');
  }

  get contrasena() {
    return this.signupForm.get('contrasena');
  }



  onSubmit() {
    const value = { ...this.signupForm.value }
    this.onSignup.emit(value);
  }

}
