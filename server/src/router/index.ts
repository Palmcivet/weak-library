import koaRouter from "@koa/router";

import { login } from "@/controller/auth";

const router = new koaRouter();

router.post("/login", login);

export const routers = router;
