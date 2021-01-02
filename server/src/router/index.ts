import koaRouter from "@koa/router";

import { UserController } from "@/controller/user";
import { BookController } from "@/controller/book";
import { ProcedureController } from "@/controller/procedure";

const router = new koaRouter();

/* 鉴权 */
router.post("/auth/login", UserController.login);
router.post("/auth/logout", UserController.logout);

/* 用户信息 CRUD */
router.post("/admin/fetch", UserController.fetch);
router.post("/admin/modify", UserController.modify);
router.post("/admin/delete", UserController.delete);
router.post("/admin/register", UserController.register);

router.post("/admin/status", UserController.status);
router.post("/admin/record", UserController.record);

/* 图书信息 CRUD */
router.post("/book/fetch", BookController.fetch);
router.post("/book/modify", BookController.modify);
router.post("/book/delete", BookController.delete);
router.post("/book/register", BookController.register);

router.post("/book/query", BookController.query);
router.post("/book/category", BookController.category);

router.post("/procedure/borrow", ProcedureController.borrow);
router.post("/procedure/return", ProcedureController.return);

export const routers = router;
