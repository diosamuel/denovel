import { MongoClient } from "https://deno.land/x/mongo@v0.9.1/mod.ts";
import { mongo } from "../../../config/database.ts";

/**
 * Denovel - A Deno Framework for Web Artisan
 *
 * @package  Denovel
 * @author   Muhammad Fauzan <developerfauzan@asraja.com>
 */

/**
 * Connection client
 *
 *
 */

export async function connectMongo(Mongo: mongo): Promise<any> {
  const client = new MongoClient();

  client.connectWithUri(`${Mongo.hostname}:${Mongo.port}`);
  const db = client.database(`${Mongo.db}`);

  return db;
}
