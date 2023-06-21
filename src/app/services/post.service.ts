import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  addPost(post: FormData) {
    return this.http.post(`${environment.apiUrl}/posts`, post);
  }

  getPosts(pageSize?: number, page?: number) {
    const query = `?pageSize=${pageSize}&page=${page}`;
    return this.http.get<{ posts: Post[], count: number }>(`${environment.apiUrl}/posts` + query);
  }

  deletePost(id: string) {
    return this.http.delete<Post>(`${environment.apiUrl}/posts/${id}`);
  }

  updatePost(id: string, post: FormData) {
    return this.http.put<Post>(`${environment.apiUrl}/posts/${id}`, post);
  }
}
