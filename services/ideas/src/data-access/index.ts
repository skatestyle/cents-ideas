import { makeUniqueId } from '@cents-ideas/utils';
import { MongoClient } from 'mongodb';
import makeIdeasDatabase from './ideas-database';
import { IdeasDatabase, MakeDatabase } from './ideas-database.types';

const { IDEAS_SERVICE_DATABASE_URL, ENV } = process.env;

const databaseName: string = ENV || 'development';
const url: string = IDEAS_SERVICE_DATABASE_URL || 'mongodb://localhost:27017';
const client: MongoClient = new MongoClient(url, { useNewUrlParser: true });

const makeDatabase: MakeDatabase = async () => {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(databaseName);
};

const ideasDatabase: IdeasDatabase = makeIdeasDatabase({
  makeDatabase,
  makeUniqueId
});

export default ideasDatabase;
