import { Component, NgZone } from '@angular/core';
import * as bootstrap from 'bootstrap';
import jsPDF from 'jspdf';
import axios from 'axios';

@Component({
  selector: 'app-employee-progress',
  templateUrl: './employee-progress.component.html',
  styleUrls: ['./employee-progress.component.css']
})
export class EmployeeProgressComponent {
  users: any = [];
  selectedUser: any = {}; 

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const response = await axios.get('http://localhost:5126/user-progress');
      this.zone.run(() => {
        this.users = response.data;
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  openModal(user: any) {
    if (user) {
      this.selectedUser = user;
      const modalElement = document.getElementById('certificateModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error('Modal element not found!');
      }
    } else {
      console.error('User data is invalid or undefined.');
    }
  }

  generatePDF() {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(20);
    doc.text('Certificate of Completion', 20, 20);
    doc.setFontSize(14);
    doc.text('This certifies that', 20, 40);
    doc.text(`Username: ${this.selectedUser?.username}`, 20, 60);
    doc.text(`User ID: ${this.selectedUser?.userId}`, 20, 80);
    doc.text(`Course Completed: ${this.selectedUser?.courseName}`, 20, 100);
    doc.text(`Date of Issue: ${this.selectedUser?.completionDate}`, 20, 120);
    doc.text('Certified By: Prometheus', 20, 140);

    const imgData = 'data:image/png;base64,...'; 
    doc.addImage(imgData, 'PNG', 15, 160, 180, 30);
    doc.save(`${this.selectedUser.username || 'User'}_Certificate.pdf`);
  }

  logout() {
    console.log('User has logged out.');
  }
}
