import { Collection } from 'mongodb';
import { MongoService } from 'botman-mongo';
import { UserDocument } from './user-document';

export class UsersService extends MongoService {
  protected readonly usersCollection: Promise<Collection<UserDocument>>;

  constructor(connectionUri: string) {
    super(connectionUri);

    this.usersCollection = this.db.then(db => db.collection('users'));
  }

  async getSortOrderPref(userId: string): Promise<string> {
    const collection = await this.usersCollection;
    const user = await collection.findOne({ userId }, { projection: { sortPrefs: 1 } });
    return user?.sortPrefs.sortOrder ?? 'A-Z';
  }

  async setSortOrderPref(userId: string, sortOrder: string): Promise<void> {
    const collection = await this.usersCollection;
    await collection.updateOne({ userId }, { $set: { 'sortPrefs.sortOrder': sortOrder } }, { upsert: true });
  }
}
