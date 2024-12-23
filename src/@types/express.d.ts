import {Users} from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: Users;
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


export {};