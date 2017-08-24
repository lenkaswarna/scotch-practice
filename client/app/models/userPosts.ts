export class UserPosts {
    constructor(
        public id: any,
        public name: string,
        public profilePic: string,
        public postPic: string,
        public videoUrl: string,
        public text:string,
        public imageCaption:string,
        public videoCaption:string,
        public likedByMe: boolean,
        public creationTime: any,
        public maxLength: number
        ){}
}