import { Component } from '@angular/core';
import axios from "axios";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    console.log({  email: this.email, password: this.password });
    axios.post('http://localhost:5126/login',{  email: this.email, password: this.password } , {withCredentials:true}).then((response)=>{
      console.log(response.data);
      if(response.data.role === 'admin' ){
         this.router.navigate(['/admin']);
      }else {
        this.router.navigate(['/userdashboard']);
      }
    }).catch((e)=>{
      console.error(e.response.data);
    })
  }
}
