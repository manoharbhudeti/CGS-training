import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password?: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  newUserForm: FormGroup;
  users: User[] = [];
  currentYear: number = new Date().getFullYear();
  editingUserId: number | null = null; 

  constructor(private fb: FormBuilder, private router: Router) {
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['']
    });
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    axios.get('http://localhost:5126/users', { withCredentials: true })
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }

  addUser() {
    if (this.newUserForm.valid) {
      const newUser: any = {
        name: this.newUserForm.value.name,
        email: this.newUserForm.value.email,
        password: this.newUserForm.value.password || 'defaultPassword123', // Default password if adding
        role: this.newUserForm.value.role || 'jr engineering'
      };

      if (this.editingUserId) {
        axios.put(`http://localhost:5126/users/${this.editingUserId}`, newUser, { withCredentials: true })
          .then(response => {
            const index = this.users.findIndex(user => user.id === this.editingUserId);
            if (index !== -1) {
              this.users[index] = response.data; 
            }
            this.resetForm();
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
      } else {
        axios.post("http://localhost:5126/registration", newUser, { withCredentials: true })
          .then(response => {
            this.users.push(response.data);
            this.resetForm();
          })
          .catch(error => {
            console.error('Error adding user:', error);
          });
      }
    } else {
      this.newUserForm.markAllAsTouched();
    }
  }

  editUser(user: User) {
    this.editingUserId = user.id; 
    this.newUserForm.patchValue({
      name: user.name,
      email: user.email,
      password: user.password, 
      role: user.role
    });
  }

  cancelEdit() {
    this.resetForm(); 
  }

  resetForm() {
    this.newUserForm.reset();
    this.editingUserId = null; 
  }

  deleteUser(user: User) {
    axios.delete(`http://localhost:5126/users/${user.id}`, { withCredentials: true })
      .then(() => {
        this.users = this.users.filter(u => u.id !== user.id);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  }

  logout() {
    localStorage.removeItem('authToken');
    sessionStorage.clear();

    setTimeout(() => {
      alert('ADMIN logged out successfully !!');
      this.router.navigate(['/login']);
    }, 600);
  }
}
