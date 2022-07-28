import { UsersService } from './users-service';
import { errors } from './errors';

export interface FavoriteUpdateOptions {
  userId: string;
  soundId: string;
}

export class FavoritesService extends UsersService {
  async addToFavorites(options: FavoriteUpdateOptions): Promise<void> {
    const collection = await this.usersCollection;
    await collection.updateOne({ userId: options.userId }, { $push: { favorites: options.soundId } }, { upsert: true });
  }

  async removeFromFavorites(options: FavoriteUpdateOptions): Promise<void> {
    const collection = await this.usersCollection;
    await collection.updateOne({ userId: options.userId }, { $pull: { favorites: options.soundId } });
  }

  async getFavorites(userId: string): Promise<string[]> {
    try {
      const collection = await this.usersCollection;
      const user = await collection.findOne({ userId }, { projection: { favorites: 1 } });
      if (!user) throw new Error(errors.userDoesNotExist);
      return user.favorites;
    } catch (error: any) {
      if (error.message === errors.userDoesNotExist) return [];
      throw error;
    }
  }
}
