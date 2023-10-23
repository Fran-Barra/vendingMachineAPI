import { Router } from "express";

export default interface Controller{
    path: String;
    router: Router;
}