import koaRouter from "@koa/router";

import { UserController } from "@/controller/user";
import { BookController } from "@/controller/book";

const router = new koaRouter();

router.post("/auth/login", UserController.login);
router.post("/auth/logout", UserController.logout);
router.post("/admin/reset", UserController.reset);
router.post("/admin/delete", UserController.delete);
router.post("/admin/profile", UserController.profile);
router.post("/admin/register", UserController.register);
router.post("/book/register", BookController.register);

export const routers = router;
