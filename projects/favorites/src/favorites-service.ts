import { Collection } from 'mongodb';
import { MongoService } from 'botman-mongo';
import { FavoritesDocument } from './favorites-document';

export class FavoritesService extends MongoService {
  protected readonly favoritesCollection: Promise<Collection<FavoritesDocument>>;

  constructor(connectionUri: string) {
    super(connectionUri);

    this.favoritesCollection = this.db.then(db => db.collection('ui-favorites'));
  }

  async getUserFavorites(userID: string) {
    const collection = await this.favoritesCollection;
    const userFavorites = await collection.findOne({ userId: userID });
    return userFavorites?.favorites;
  }

  async saveUserFavorites(userId: string, newFavorites: string[]) {
    const collection = await this.favoritesCollection;
    collection.updateOne({ userId }, { $set: { favorites: newFavorites } }, { upsert: true });
  }
}
