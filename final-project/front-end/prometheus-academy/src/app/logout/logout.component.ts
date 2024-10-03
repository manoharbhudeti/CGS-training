import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import axios from 'axios';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) {} 

  ngOnInit() {
    this.logout();
  }

  logout() {
    axios.post('http://localhost:5126/logout', {}, { withCredentials: true })
      .then(response => {
        console.log('Logged out successfully:', response.data);
        
        localStorage.removeItem('authToken');
        sessionStorage.clear();
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  }
}
