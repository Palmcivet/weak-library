import koaRouter from "@koa/router";

import { UserController } from "@/controller/user";
import { BookController } from "@/controller/book";
import { ProcedureController } from "@/controller/procedure";

const router = new koaRouter();

router.post("/auth/login", UserController.login);
router.post("/auth/logout", UserController.logout);

router.post("/admin/reset", UserController.reset);
router.post("/admin/fetch", UserController.fetch);
router.post("/admin/modify", UserController.modify);
router.post("/admin/delete", UserController.delete);
router.post("/admin/register", UserController.register);

router.post("/book/fetch", BookController.fetch);
router.post("/book/modify", BookController.modify);
router.post("/book/delete", BookController.delete);
router.post("/book/register", BookController.register);

router.post("/procedure/borrow", ProcedureController.borrow);

export const routers = router;
