import { Client } from 'faunadb';

export const faunadb = new Client({
  secret: process.env.FAUNADB_DATABASE_SECRET_KEY,
});
