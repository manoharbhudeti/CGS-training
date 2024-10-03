import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private API_KEY = 'AIzaSyBCdbB6qlgrE1wb9tBX28eq3CF1qMOVrv8';
  private PLAYLIST_URL = 'https://www.googleapis.com/youtube/v3/playlistItems'; 

  constructor(private http: HttpClient) {}

  getPlaylistVideos(playlistId: string): Observable<any> {
    return this.http.get(`${this.PLAYLIST_URL}`, {
      params: {
        part: 'snippet',
        playlistId: playlistId,
        key: this.API_KEY,
        maxResults: '50',
      },
    });
  }
}
