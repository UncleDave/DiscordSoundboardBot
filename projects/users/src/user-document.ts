import { Tag } from './tag';

export interface UserDocument {
  userId: string;
  favorites: string[];
  tags: Tag[];
}
