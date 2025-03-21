import mongoose from "mongoose";
import { User } from mongoose; 

declare global {
    namespace Express {
        interface Request {
            user?: User; 
        }
    }
}