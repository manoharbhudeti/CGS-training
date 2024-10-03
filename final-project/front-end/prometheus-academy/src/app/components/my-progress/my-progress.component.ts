import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { Modal } from 'bootstrap';
import axios from 'axios';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-my-progress',
  templateUrl: './my-progress.component.html',
  styleUrls: ['./my-progress.component.css']
})
export class MyProgressComponent implements OnInit {
  courses: any[] = []; 
  user: any = {}; 
  selectedCourse: any = {}; 
  chartInstance: Chart<'pie', number[], string> | undefined;

  constructor() {}

  async ngOnInit() {
    // Fetch user's progress on courses
    await axios.get('http://localhost:5126/user/progress', { withCredentials: true })
      .then((res) => {
        this.courses = res.data;
      })
      .catch((error) => {
        console.error('Error fetching user progress:', error);
      });

    // Fetch user details
    await axios.get('http://localhost:5126/user/details', { withCredentials: true })
      .then((res) => {
        this.user = res.data;
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }


  openProgressChart(progress: number): void {
    const modalElement = document.getElementById('chartModal') as HTMLElement;
    const modal = new Modal(modalElement);
    modal.show();

    const ctx = (document.getElementById('progressChart') as HTMLCanvasElement).getContext('2d');
    if (this.chartInstance) {
      this.chartInstance.destroy(); 
    }

    if (ctx) {
      const chartConfig: ChartConfiguration<'pie', number[], string> = {
        type: 'pie',
        data: {
          labels: ['Completed', 'Remaining'],
          datasets: [{
            data: [progress, 100 - progress],
            backgroundColor: ['#4CAF50', '#e9ecef']
          }]
        },
        options: {
          responsive: true,
          animation: {
            animateScale: true,
            animateRotate: true,
            duration: 1000
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      };

      this.chartInstance = new Chart(ctx, chartConfig);
    }
  }


  openCertificateModal(course: any): void {
    this.selectedCourse = course;
    console.log(this.selectedCourse);
    const modalElement = document.getElementById('certificateModal') as HTMLElement;
    const modal = new Modal(modalElement);
    modal.show();
  }


  downloadCertificate(): void {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Prometheus Academy', 105, 30, { align: 'center' });

    doc.addImage('assets/logo.png', 'PNG', 80, 50, 50, 50);
    doc.setFontSize(16);
    doc.text(`Congratulations, ${this.user.name}`, 105, 120, { align: 'center' });
    doc.text('You have successfully completed the course:', 105, 140, { align: 'center' });
    doc.text(this.selectedCourse.title, 105, 160, { align: 'center' });

    doc.setFontSize(14);
    doc.text(`Course ID: ${this.selectedCourse.courseId}`, 105, 180, { align: 'center' });
    doc.text(`Username: ${this.user.username}`, 105, 200, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Prometheus Academy', 105, 240, { align: 'center' });

    doc.save(`${this.selectedCourse.title}_certificate.pdf`);
  }
}
