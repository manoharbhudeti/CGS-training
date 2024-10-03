import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

interface Course {
  id: number;
  playListID: string;
  courseName: string;
  details: string;
  totalModule: number;
}

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {
  newCourseForm: FormGroup;
  courses: Course[] = [];
  currentYear: number = new Date().getFullYear(); 
  editingCourse: Course | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.newCourseForm = this.fb.group({
      playListID: ['', Validators.required],
      courseName: ['', Validators.required],
      details: ['', Validators.required],
      totalModule: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    axios.get('http://localhost:5126/courses', { withCredentials: true })
      .then(response => {
        this.courses = response.data;
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        if (error.response.status === 401) {
          this.router.navigate(['/login']);
        }
      });
  }

  addOrUpdateCourse() {
    if (this.newCourseForm.valid) {
      const newCourse = this.newCourseForm.value;
      console.log(newCourse);
      if (this.editingCourse) {
        console.log(newCourse);
        axios.put(`http://localhost:5126/admin/edit-course/${this.editingCourse.id}`, newCourse, { withCredentials: true })
          .then(response => {
            this.fetchCourses();
            this.cancelEdit();
          })
          .catch(error => {
            console.error('Error updating course:', error);
          });
      } else {
      
        axios.post('http://localhost:5126/admin/add-course', newCourse, { withCredentials: true })
          .then(response => {
            this.courses.push(response.data);
            this.newCourseForm.reset();
          })
          .catch(error => {
            console.error('Error adding course:', error);
          });
      }
    }
  }

  editCourse(course: Course) {
    this.editingCourse = course;
    this.newCourseForm.patchValue(course);  
  }

  cancelEdit() {
    this.editingCourse = null;
    this.newCourseForm.reset();
  }

  deleteCourse(course: Course) {
    axios.delete(`http://localhost:5126/admin/delete-course/${course.id}`, { withCredentials: true })
      .then(() => {
        this.courses = this.courses.filter(c => c.id !== course.id);
      })
      .catch(error => {
        console.error('Error deleting course:', error);
      });
  }

  logout() {
    console.log('Logged out successfully.');
    this.router.navigate(['/login']);
  }
}
