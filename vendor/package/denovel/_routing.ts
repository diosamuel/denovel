import { Application, send, Router } from "https://deno.land/x/oak/mod.ts";
import routes from "../../../routes/web.ts";

/**
 * Denovel - A Deno Framework for Web Artisan
 *
 * @package  Denovel
 * @author   Muhammad Fauzan <developerfauzan@asraja.com>
 */

/* init application route */

const app = new Application();
const router = new Router();

/**
 * Get the response time of the application
 * 
 * @return {Promise<void>} 
 */

app.use(async (ctx, next): Promise<void> => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

/**
 * Set the response time of the application
 * 
 * @return {Promise<void>} 
 */

app.use(async (ctx, next): Promise<void> => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

/**
 * Handling Route By Method
 * 
 * 
 */

for(let route of routes){
    switch(route.method){
        case 'get':
            routeHandler(route.html,route.url || '',route.path || '',route.method || '',route.return);
        break;
        case 'post':
            routeHandler(route.html,route.url || '',route.path || '',route.method || '',route.return);
        break;
        case 'put':
            routeHandler(route.html,route.url || '',route.path || '',route.method || '',route.return);
        break;
        case 'delete':
            routeHandler(route.html,route.url || '',route.path || '',route.method || '',route.return);
        break;
    }
} 

/**
 * Route Handler
 * 
 * 
 */

function routeHandler(html: boolean,url: string,path: any,method: string,returnValue: any){
    if(html && method == 'get'){
        router.get(`${url}`, async (ctx) => {
          await send(ctx, '/', {
            root: `${Deno.cwd()}/resources/views`,
            index: `${path}.html`,
          });    
        });            
    }else{
        if(method == 'get'){
            router.get(`${url}`, async ({ params, response }: { params: any; response: any }) => {
                returnValue({ params, response });
            });            
        }else if(method == 'post'){
            router.post(`${url}`, async ({ request, response }: { request: any; response: any }) => {
                const body = await request.body();
                returnValue({ request, response, body });
            });
        }else if(method == 'put'){
            router.put(`${url}`, async ({ params,request, response }: { params: any; request: any; response: any }) => {
                returnValue({ params,request, response });
            });
        }else if(method == 'delete'){
            router.delete(`${url}`, async ({ params,response }: { params: any; response: any }) => {
                returnValue({ params,response })
            })  
        }
    }    

}

/**
 * Router Plugin
 * 
 * 
 */

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.throw(404);
});

export default app;
