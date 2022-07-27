import { Collection, WithId } from 'mongodb';
import { MongoService } from 'botman-mongo';
import { UserDocument } from './user-document';
import { errors } from './errors';

export class UsersService extends MongoService {
  private static usersCollection: Promise<Collection<UserDocument>>;

  protected readonly usersCollection: Promise<Collection<UserDocument>>;

  constructor(connectionUri: string) {
    super(connectionUri);

    UsersService.usersCollection = this.db.then(db => db.collection('users'));
    this.usersCollection = UsersService.usersCollection;
  }

  async getUser(userId: string): Promise<WithId<UserDocument>> {
    const collection = await this.usersCollection;
    const user = await collection.findOne({ userId });
    if (!user) throw new Error(errors.UserDoesNotExist);
    return user;
  }
}
