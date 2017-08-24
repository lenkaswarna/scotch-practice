import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserPosts } from "../models/userPosts";
import { UserService } from "../services/user.service";

// Component decorator
@Component({
    moduleId: module.id,
    selector: 'my-photos',
    templateUrl: 'photos.component.html',
    styleUrls: ['photos.component.css']
    
})
// Component class
export class PhotosComponent {
    userPosts: UserPosts[];
    newUserPosts: FormGroup;
    constructor(
        private userService: UserService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.getUserDetails();
        this.newUserPosts = this.fb.group({
            id: new Date(),
            name: ['Arun Gadag'],
            profilePic: ['./assets/arun.jpg'],
            postPic: [''],
            videoUrl: [''],
            text: [''],
            imageCaption: [''],
            videoCaption: [''],
            likedByMe:  [false],
            creationTime:  new Date(),
            likes: 8
        })
    }

    getUserDetails():void {
        this.userService.getUserDetails()
        .subscribe(
            userPosts => this.userPosts = userPosts,
            err => {
                console.log(err);
            }
        );
    }

    onSubmit({ value, valid }: { value: UserPosts, valid: boolean }) {
        //console.log(JSON.stringify(value));
        this.addNewPost(value);
    }

    addNewPost(user: UserPosts):void {
        this.userService.addNewPost(user)
        .subscribe(
            userPosts => this.userPosts = userPosts,
            err => {
                console.log(err);
            }
        );
    }

    ngOnChanges() {
        this.getUserDetails();
    }
 }
