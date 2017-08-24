import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserPosts } from '../models/userPosts';

@Component({
    moduleId: module.id,
    selector:'my-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.css']
})

export class ListComponent implements OnChanges, OnInit {
    userPosts: UserPosts[];
    newUserPosts: FormGroup;
    limit:number = 5;
    button: string = 'Load more...';
    //totalPosts:number;
    expand: boolean = false;

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
            likes: 8,
            maxLength: 100
        });
    }

    getUserDetails():void {
        this.userService.getUserDetails()
        .subscribe(
            userPosts => this.userPosts = userPosts.slice(0,this.limit),
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
            userPosts => this.userPosts = userPosts.slice(0,this.limit),
            err => {
                console.log(err);
            }
        );
    }

    ngOnChanges() {
        this.getUserDetails();
    }

    click() {
        this.limit = this.limit + 5;
        this.userService.getUserDetails()
        .subscribe(
            userPosts => this.userPosts = userPosts.slice(0,this.limit),
            err => {
                console.log(err);
            }
        );
        //console.log("Userposts: " + this.userPosts.length);
        //console.log("Totalposts: " + this.totalPosts);
        /*if(this.userPosts.length == this.totalPosts) {
            this.button = 'End of posts!';
        }*/
    }

    //for expand functionality
    showMore(user: UserPosts) {
        if(this.expand === false) {
            user.maxLength = user.text.length;
            this.expand = true; 
            let id = user.id;
            document.getElementById(id).innerHTML = 'Less&nbsp;<i class="fa fa-caret-up" aria-hidden="true"></i>';
        } else {
            user.maxLength = 100;
            this.expand = false;
            let id = user.id;
            document.getElementById(id).innerHTML = 'Expand&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i>';
        }
    }
}