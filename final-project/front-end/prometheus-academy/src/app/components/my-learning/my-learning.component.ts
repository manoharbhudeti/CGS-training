import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { YoutubeService } from 'src/app/youtube.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-learning',
  templateUrl: './my-learning.component.html',
  styleUrls: ['./my-learning.component.css']
})
export class MyLearningComponent implements OnInit {
  pendingCourses: any[] = [];
  watchLaterCourses: any[] = [];

  constructor(private youtubeService: YoutubeService, private router: Router) {}
  
  ngOnInit() {
    axios.get('http://localhost:5126/pending-progress', { withCredentials: true })
      .then(res => {
        if(res.status === 204 ){
          console.log('No pending courses');
          return ;
        }
        res.data.forEach((course: any) => {
          this.youtubeService.getPlaylistVideos(course.playlistID).subscribe((playlistData: any) => {
            const videoId = playlistData.items[0].snippet.resourceId.videoId;
            const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
            this.pendingCourses.push({
              title: course.courseName,
              description: `Progress: ${course.progress}% (${course.modulesCompleted}/${course.totalModules} modules)`,
              thumbnail: thumbnail,
              progress: Math.round(course.progress),
              courseId: course.courseId,
              status: course.progress === 100 ? 'completed' : course.progress > 0 ? 'ongoing' : 'not_started'
            });
          });
        });
      })
      .catch(error => {
        if(error.code === 401 ){
          this.router.navigate(['/login']);
        }
        console.error('Error fetching pending courses:', error);
      });

    axios.get('http://localhost:5126/watch-later', { withCredentials: true })
      .then(res => {
        if(res.status === 204 ){
          console.log('no videos in watch later courses');
          return ;
        }
        res.data.forEach((course: any) => {
          this.youtubeService.getPlaylistVideos(course.playlistID).subscribe((playlistData: any) => {
            const videoId = playlistData.items[0].snippet.resourceId.videoId;
            const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
            this.watchLaterCourses.push({
              title: course.courseName,
              description: `Progress: ${course.progress}% (${course.modulesCompleted}/${course.totalModules} modules)`,
              thumbnail: thumbnail,
              progress: Math.round(course.progress),
              courseId: course.courseId,
              status: course.progress === 100 ? 'completed' : course.progress > 0 ? 'ongoing' : 'not_started'
            });
          });
        });
      })
      .catch(error => {
        if(error.code === 401 ){
          this.router.navigate(['/login']);
        }
        console.error('Error fetching watch later courses:', error);
      });
  }
}
