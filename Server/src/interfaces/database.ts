

export interface Otp {
    otp: string
    createdAt: Date;
    email:string
}


export  interface User{
    firstName:string,
    lastName:string,
    email:string,
    mobile:number,
    password:string,
    location:string,
    profileImage:string,
    role:string,
    subrole:string,
    followers:string[],
    following:string[],
    createdAt:Date
 }
 