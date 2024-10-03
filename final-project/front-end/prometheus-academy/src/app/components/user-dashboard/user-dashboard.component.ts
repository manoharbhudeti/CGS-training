import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../youtube.service'

import axios from "axios";
import {Router} from "@angular/router";

interface Course {
  title: string;
  description: string;
  thumbnail: string;
  progress: number;
  courseId: number;
  status: 'ongoing' | 'completed' | 'not_started';
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  courses: Course[] = [];

  constructor(private youtubeService: YoutubeService, private router: Router) {}

  ngOnInit() {
    axios.get('http://localhost:5126/pending-progress', { withCredentials: true }).then(res => {
      res.data.forEach((course: any) => {
        this.youtubeService.getPlaylistVideos(course.playlistID).subscribe((playlistData: any) => {
          const videoId = playlistData.items[0].snippet.resourceId.videoId;
          const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

          this.courses.push({
            title: course.courseName,
            description: `Progress: ${course.progress}% (${course.modulesCompleted}/${course.totalModules} modules)`,
            thumbnail: thumbnail,
            progress: Math.round(course.progress),
            courseId: course.courseId,
            status: course.progress === 100 ? 'completed' : course.progress > 0 ? 'ongoing' : 'not_started'
          });
        });
      });
    }).catch((e) => {
      console.log(e.response.data);
      if (e.status === 401) {
        this.router.navigate(['/login']);
      }
    });
  }
}
