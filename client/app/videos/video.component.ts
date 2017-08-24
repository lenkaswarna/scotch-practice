import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserPosts } from "../models/userPosts";
import { UserService } from "../services/user.service";

@Component({
    moduleId: module.id,
    selector:'my-videos',
    templateUrl: 'video.component.html',
    styleUrls: ['video.component.css']
})

export class VideoComponent {
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
            text: ['Hello'],
            imageCaption: [''],
            videoCaption: [''],
            likedByMe:  [false],
            creationTime:  new Date(),
            likes: 5
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