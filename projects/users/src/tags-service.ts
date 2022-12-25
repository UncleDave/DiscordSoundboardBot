import { UsersService } from './users-service';
import { Tag } from './tag';

interface TagPropsOptions {
  userId: string;
  tagId: string;
  tagName: string;
  tagColor: string;
}

interface AddTagSoundsOptions {
  userId: string;
  tagId: string;
  sounds: string;
}

interface RemoveTagSoundsOptions {
  userId: string;
  deleted: string[];
}

interface RemoveTagOptions {
  userId: string;
  tagId: string;
}

export class TagsService extends UsersService {
  async getCustomTags(userId: string): Promise<Tag[]> {
    const collection = await this.usersCollection;
    const user = await collection.findOne({ userId }, { projection: { tags: 1 } });
    return user?.tags ?? [];
  }

  async getGroupsPref(userId: string): Promise<string> {
    const collection = await this.usersCollection;
    const user = await collection.findOne({ userId }, { projection: { sortPrefs: 1 } });
    return user?.sortPrefs.tagGroups ?? 'none';
  }

  async setGroupsPref(userId: string, groups: string): Promise<void> {
    const collection = await this.usersCollection;
    await collection.updateOne({ userId }, { $set: { sortPrefs: { tagGroups: groups } } }, { upsert: true });
  }

  async addNewTag(options: TagPropsOptions): Promise<void> {
    const collection = await this.usersCollection;
    const tag = { id: options.tagId, name: options.tagName, color: options.tagColor, sounds: new Array<string>() };
    await collection.updateOne({ userId: options.userId }, { $addToSet: { tags: tag } }, { upsert: true });
  }

  async editTagProps(options: TagPropsOptions): Promise<void> {
    const collection = await this.usersCollection;
    await collection.updateOne({ userId: options.userId, 'tags.id': options.tagId }, { $set: { 'tags.$.name': options.tagName, 'tags.$.color': options.tagColor } });
  }

  async deleteTag(options: RemoveTagOptions): Promise<void> {
    const collection = await this.usersCollection;
    await collection.updateOne({ userId: options.userId }, { $pull: { tags: { id: options.tagId } } });
  }

  async addSoundsToTag(options: AddTagSoundsOptions): Promise<void> {
    const collection = await this.usersCollection;
    await collection.updateOne({ userId: options.userId, 'tags.id': options.tagId }, { $push: { 'tags.$.sounds': { $each: [...options.sounds] } } });
  }

  async removeSoundsFromTags(options: RemoveTagSoundsOptions): Promise<void> {
    const collection = await this.usersCollection;
    await collection.updateOne({ userId: options.userId }, { $pull: { 'tags.$[].sounds': { $in: [...options.deleted] } } });
  }
}
