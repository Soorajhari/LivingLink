
import { Request, Response } from "express";

export interface UserRequest extends Request {
    body: {
      firstName: string;
      lastName: string;
      email: string;
      mobile: number;
      password: string;
      role: string;
      subrole: string;
    };
  }


  export interface otpRequest extends Request {
    body: {
      otp: string[];
    };
  }


  export interface userData extends Request {
    body: {
      email: string;
      passowrd: string;
    };
  }



  