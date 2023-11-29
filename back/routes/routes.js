import { verifyToken } from "../middleware/jwt.middleware.js";
import { sanitizeMiddleware } from "../middleware/sanitize.middleware.js";
import initPostRoutes from "./post.routes.js";

import initUserRoutes from "./user.routes.js";

const initRoutes = (app) => {
  initUserRoutes(app, sanitizeMiddleware, verifyToken);
  initPostRoutes(app, sanitizeMiddleware, verifyToken);
};

export default initRoutes;
