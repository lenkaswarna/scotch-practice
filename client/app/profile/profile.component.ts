import { Component } from '@angular/core';
import { UserPosts } from "../models/userPosts";
import { UserService } from "../services/user.service";

@Component({
    moduleId: module.id,
    selector: 'my-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})

export class ProfileComponent {
    userPosts: UserPosts[];
    constructor(private userService: UserService) {
        this.getUserDetails();
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
}