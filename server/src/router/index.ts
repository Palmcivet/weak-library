import koaRouter from "koa-router";

import { test } from "@/controller/index";

const router = new koaRouter();

router.get("/", test);

export const routers = router;
