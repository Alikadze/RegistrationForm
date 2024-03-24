import { group } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export const AgeValidator = (control: AbstractControl<any>): any => {
  const birthDate = new Date(control.value);
  const age = new Date().getFullYear() - birthDate.getFullYear();
  return age >= 18 ? null : { age: true };
};

export const passwordMatchValidator = (): any => {
  return (group: FormGroup) => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    const isValid = password === confirmPassword;
    group
      .get('confirmPassword')
      ?.setErrors(isValid ? null : { passwordMatch: true });
    return isValid ? null : { passwordMatch: true };
  };
};

@Component({
  selector: 'app-registation',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './registation.component.html',
  styleUrl: './registation.component.scss',
})
export class RegistationComponent {
  registerForm = new FormGroup(
    {
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(18),
      ]),

      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(18),
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),

      birthDate: new FormControl('', [Validators.required, AgeValidator]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ]),

      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordMatchValidator() }
  );

  onSubmit() {
    console.log(this.registerForm)
    this.registerForm.markAllAsTouched();
  }

  showPassword: boolean = false;

  onShowPass() {
    this.showPassword = !this.showPassword;
  }
}
