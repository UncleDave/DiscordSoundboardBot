import { Collection, MongoClient } from 'mongodb';
import { FavoritesDocument } from './favorites-document';

export class FavoritesService {
  protected readonly favoritesCollection: Promise<Collection<FavoritesDocument>>;

  constructor(connectionUri: string) {
    this.favoritesCollection = new MongoClient(connectionUri).connect().then(x => x.db('botman').collection('ui-favorites'));
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
