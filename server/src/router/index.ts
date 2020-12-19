import koaRouter from "@koa/router";

import { register, login, logout, reset } from "@/controller/auth";

const router = new koaRouter();

router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.post("/auth/register", register);
router.post("/auth/reset", reset);

export const routers = router;
