import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  private mode = 'create';
  postId: string = '';
  post = {} as Post;
  posts: Post[] = [];
  isLoading = false;
  postForm!: FormGroup;
  imagePreview!: string
  constructor(public postsService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.formInit();
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId')!;
        this.getPosts();
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }
  formInit() {
    this.postForm = new FormGroup({
      'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'content': new FormControl(null, { validators: [Validators.required] }),
      'image': new FormControl(null, { validators: [Validators.required] })
    });
  }

  imageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files![0]; // get file
    this.postForm.patchValue({ image: file }); // set form value
    this.postForm.get('image')!.updateValueAndValidity(); // update form
    const reader = new FileReader(); // create file reader
    reader.onload = () => {
      this.imagePreview = reader.result as string; // set image preview
    }
    reader.readAsDataURL(file); // read file
  }

  getPosts() {
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.posts; // assign posts
      },
      error: (error) => { console.log(error) }, // handle error
      complete: () => {
        this.post = this.posts.find((post) => post._id === this.postId)!; // find post
        this.postForm.patchValue({ title: this.post.title, content: this.post.content, image: this.post.image }) // set form values
      }
    })
  }

  onSavePost() {
    if (this.mode === 'create') {
      this.isLoading = true;
      const post = new FormData;
      Object.keys(this.postForm.controls).forEach((k => {
        post.append(k, this.postForm.get(k)?.value)
      }))
      // add post
      this.postsService.addPost(post).subscribe({
        next: (data) => {
          this.isLoading = false;
        },
        error: (error) => { console.log(error) }, // handle error
        complete: () => {
          // reset form
          this.postForm.reset();
          this.router.navigate(['/']); // navigate to home page
        }
      })

    } else {
      this.isLoading = true;
      const post = new FormData;
      Object.keys(this.postForm.controls).forEach((k => {
        post.append(k, this.postForm.get(k)?.value)
      }))

      // update post

      this.postsService.updatePost(this.postId, post).subscribe({
        next: (data) => {
          this.isLoading = false;
        },
        error: (error) => { console.log(error) }, // handle error
        complete: () => {
          // reset form
          this.postForm.reset();
          this.router.navigate(['/']); // navigate to home page
        }
      })
    }
  }
}
