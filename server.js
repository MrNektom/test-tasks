import { stat } from "fs/promises";
import Koa from "koa";
import serve from "koa-static";
import { join, parse } from "path";

import sass from "sass";

let app = new Koa();
app.context.cache = {};

app.use(async (ctx,next)=>{
    let u = join(".",ctx.request.url.split("?")[0])
    
    if (u.endsWith(".sass")) {
        if (ctx.cache[u] && (await stat(u)).mtimeMs < ctx.cache[u].time) {
            ctx.type = "text/css"
            ctx.body = ctx.cache[u].css
        } else {
           let css = (await sass.compileAsync(u)).css;
           ctx.cache[u] = {
               css,
               time:Date.now()
           }
           ctx.type = "text/css"
           ctx.body = css
        }
    } else {
        await next()
    }
    console.log(ctx.status,ctx.url)
})

app.use(serve(".",{}))


app.listen(8080);