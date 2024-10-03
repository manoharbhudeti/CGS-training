import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { YoutubeService } from 'src/app/youtube.service'; 

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  courses: any[] = [];

  constructor(private router: Router, private youtubeService: YoutubeService) {}

  ngOnInit(): void {
    this.getCourses();
  }

  enroll(course:number){
    axios.post('http://localhost:5126/enroll',{
      CourseID:course
    },{withCredentials:true}).then((res)=>{
      if(res.status === 200 || res.status === 201 ){
        this.getCourses(); 
        this.router.navigate(['/mylearning']).then(() => {});
        
      }
    }).catch((e)=>{
      if(e.status === 201 ){
        alert('you haved logout');  
      }
    });
  }

  getCourses() {
    this.courses = [];
    axios.get('http://localhost:5126/all-courses', { withCredentials: true })
      .then(res => {
        res.data.forEach((course: any) => {
          this.youtubeService.getPlaylistVideos(course.playListID).subscribe((playlistData: any) => {
            
            if (playlistData.items && playlistData.items.length > 0) {
              const videoId = playlistData.items[0].snippet.resourceId.videoId;
              const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
              let description;
                if(course.isEnrolled){
                  description=`Progress: ${course.progress}% (${course.modulesCompleted}/${course.totalModule} modules)`
                }else{
                  description=` total ${course.totalModule} modules  `;
                }

              this.courses.push({
                id:course.id,
                title: course.courseName,
                description: description ,
                thumbnail: thumbnail, 
                progress: Math.round(course.progress),
                courseId: course.id, 
                status: course.progress === 100 ? 'completed' : course.progress > 0 ? 'ongoing' : 'not_started',
                isEnrolled: course.isEnrolled 
              });
            } else {
              
              this.courses.push({
                id:course.id,
                title: course.courseName,
                description: `Progress: ${course.progress}% (${course.modulesCompleted}/${course.totalModule} modules)`,
                thumbnail: 'https://img.youtube.com/vi/default.jpg',
                progress: Math.round(course.progress),
                courseId: course.id, 
                status: course.progress === 100 ? 'completed' : course.progress > 0 ? 'ongoing' : 'not_started',
                isEnrolled: course.isEnrolled 
              });
            }
          });
        });
      })
      .catch((e) => {
        console.log(e.response.data);
        if (e.status === 401) {
          this.router.navigate(['/login']);
        }
      });
  }
}
