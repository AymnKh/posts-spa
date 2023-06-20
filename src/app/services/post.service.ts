import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  addPost(post: FormData) {
    return this.http.post('http://localhost:3000/api/v1/posts', post);
  }

  getPosts(pageSize?: number, page?: number) {
    const query = `?pageSize=${pageSize}&page=${page}`;
    return this.http.get<{ posts: Post[], count: number }>('http://localhost:3000/api/v1/posts' + query);
  }

  deletePost(id: string) {
    return this.http.delete<Post>(`http://localhost:3000/api/v1/posts/${id}`);
  }

  updatePost(id: string, post: FormData) {
    return this.http.put<Post>(`http://localhost:3000/api/v1/posts/${id}`, post);
  }
}
