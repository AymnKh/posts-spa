import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

  posts: Post[] = [];
  isLoading = false;
  totalPosts: number = 0;
  postsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10]
  userAuthnticated = false;
  token: string | null = '';
  user!: { email: string, userID: string };

  constructor(public postsService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.getAllPosts(); // load all posts on init
    this.checkToken(); // call checkToken method
    this.getPayload(); // call getpayload method
  }

  checkToken() {
    this.token = this.authService.getToken(); // get token 
    this.token ? this.userAuthnticated = true : this.userAuthnticated = false; // if token is true set userAuth to true
  }

  getPayload() {
    const payload = this.token?.split('.')[1]; // split token into 3 parts
    if (payload) {
      this.user = JSON.parse(window.atob(payload)); // decode payload
    }
  }
  getAllPosts() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage).subscribe({ // subscribe to observable
      next: (data) => {
        this.posts = data.posts; // assign data to posts property
        console.log(data);
        this.totalPosts = data.count; // nu,ber of posts
      },
      error: (error) => {
        console.log(error)
        this.isLoading = false;
      }, // handle error
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  deletePost(id: string) {
    this.postsService.deletePost(id).subscribe({ // subscribe to observable
      next: (data) => {
        this.getAllPosts(); // reload posts
      },
      error: (error) => { console.log(error) }, // handle error
      complete: () => { }
    })
  }

  onChangePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.postsPerPage = event.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage).subscribe({ // subscribe to observable
      next: (data) => {
        this.posts = data.posts; // assign data to posts property
      },
      error: (error) => {
        console.log(error)
        this.isLoading = false;
      }, // handle error
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  ngDoCheck() {
    this.checkToken(); // call checkToken method
  }
}
