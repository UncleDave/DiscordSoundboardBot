import { UpdateResult } from 'mongodb';
import { UsersService } from './users-service';

export interface FavoriteUpdateOptions {
  userId: string,
  soundId: string,
}

export class FavoritesService extends UsersService {
  async addToFavorites(options: FavoriteUpdateOptions): Promise<UpdateResult> {
    const collection = await this.usersCollection;
    return collection.updateOne({ userId: options.userId }, { $push: { favorites: options.soundId } }, { upsert: true });
  }

  async removeFromFavorites(options: FavoriteUpdateOptions): Promise<UpdateResult> {
    const collection = await this.usersCollection;
    return collection.updateOne({ userId: options.userId }, { $pull: { favorites: options.soundId } });
  }

  async getFavorites(userId: string): Promise<string[]> {
    try {
      const user = await this.getUser(userId);
      return user.favorites;
    } catch (error: any) {
      if (error.message === 'User does not exist') return [];
      throw error;
    }
  }
}
