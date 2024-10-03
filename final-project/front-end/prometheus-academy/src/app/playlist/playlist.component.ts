import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../youtube.service'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import axios from 'axios'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  videos: any[] = [];
  selectedVideo: any; 
  playlistId: string = '';
  errorMessage: string = '';
  completedModules: number[] = []; 
  courseId: any = 2; 
  courseName: string = '';
  courseDetails: string = '';

  constructor(
    private route: ActivatedRoute, 
    private youtubeService: YoutubeService,
    private sanitizer: DomSanitizer,
    private http: HttpClient 
  ) {}

  async ngOnInit(): Promise<void> {
    this.courseId = this.route.snapshot.paramMap.get('courseid') || '';
    await this.fetchCourseProgress();
    if (this.playlistId) {
      this.fetchVideos();
    } else {
      this.errorMessage = 'Playlist ID is missing';
    }
  }

  fetchVideos(): void {
    this.youtubeService.getPlaylistVideos(this.playlistId).subscribe(
      (data: any) => {
        this.videos = data.items || [];
        if (this.videos.length === 0) {
          this.errorMessage = 'No videos found in this playlist.';
        }
      },
      (error) => {
        console.error('Error fetching videos:', error);
        this.errorMessage = 'An error occurred while fetching videos.';
      }
    );
  }

  async fetchCourseProgress() {
    try {
      const response = await axios.get(`http://localhost:5126/course-progress/${this.courseId}`, { withCredentials: true });
      const progressData = response.data;

      this.playlistId = progressData.playlistID;  
      this.completedModules = progressData.completedModules.map((module: any) => module.moduleNo);
      this.courseName = progressData.courseName; 
      this.courseDetails = progressData.courseDetails; 
    } catch (error) {
      console.error('Error fetching course progress:', error);
      this.errorMessage = 'Failed to load course progress. Please try again later.';
    }
  }

  selectVideo(video: any): void {
    this.selectedVideo = video; 
  }

  getSafeUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  markAsCompleted(): void {
    if (this.selectedVideo) {
      const moduleNo = this.getModuleNoForVideo(this.selectedVideo);

      const moduleData = {
        courseID: this.courseId, 
        moduleNo: moduleNo
      };

      axios.post('http://localhost:5126/add_module', moduleData, { withCredentials: true })
        .then(response => {
          console.log('Module marked as completed:', response.data);
          this.completedModules.push(moduleNo); 
        })
        .catch(error => {
          console.error('Error marking module as completed:', error);
        });
    }
  }
  
  
  getModuleNoForVideo(video: any): number {
    return this.videos.findIndex(v => v.snippet.resourceId.videoId === video.snippet.resourceId.videoId) + 1;
  }

  isModuleCompleted(moduleNo: number): boolean {
    return this.completedModules.includes(moduleNo);
  }

  isSelectedVideoCompleted(): boolean {
    if (this.selectedVideo) {
      const moduleNo = this.getModuleNoForVideo(this.selectedVideo);
      return this.isModuleCompleted(moduleNo);
    }
    return false;
  }
}
