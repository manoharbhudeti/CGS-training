import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      role: ['', Validators.required],  // Added role field
      rememberMe: [false]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else if (confirmPassword) {
      confirmPassword.setErrors(null);
    }
    return null;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData=this.registrationForm.value
      alert('Registered successfully!');
      axios.post('http://localhost:5126/registration',{
         name: formData.username,
         email:formData.email,
         password:formData.password,
         role:formData.role
      }).then((res)=>{
        if(res.status === 201 ){
          this.router.navigate(['/login']);
        }
      });
      
    } else {
      Object.keys(this.registrationForm.controls).forEach(key => {
        const control = this.registrationForm.get(key);
        control?.markAsTouched();
      });

      alert('Please fill out the form correctly.');
    }
  }

  isFieldInvalid(field: string) {
    const control = this.registrationForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }
}
