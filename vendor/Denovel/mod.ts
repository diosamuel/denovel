import { app } from "./Support/Facades/Http.ts";
import { parse } from "https://deno.land/std@0.62.0/flags/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { success, error } from "https://deno.land/x/colorlog/mod.ts";

/**
 * Denovel - A Deno Framework for Web Artisan
 *
 * @package  Denovel
 * @author   Muhammad Fauzan <developerfauzan@asraja.com>
 */

/* init args */
const { args } = Deno;

/*
|--------------------------------------------------------------------------
| Args
|--------------------------------------------------------------------------
|
| This value is from the command line
|
*/
const Args = parse(args);

/* export port */
const port = {
  args: Args.port || Args.p,
  env: parseInt(config().PORT),
  default: 8000,
};

export class Server {
  async run(): Promise<void> {
    console.log(
      success(`Listening on port ${port.args || port.env || port.default} ...`)
    );

    await app.listen({
      port: port.args || port.env || port.default,
    });
  }

  versioning() {
    console.log(success("Denovel v1.2.0"));
  }
}
