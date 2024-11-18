import {User} from "@prisma/client";
import multer from "multer";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        location?: string;
      }
    }
  }
}