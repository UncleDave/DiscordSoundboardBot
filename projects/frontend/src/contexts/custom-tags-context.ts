import { createContext, useContext } from 'react';
import TagProps from '../models/tag-props';

interface CustomTagsContextProps {
  showCustomTagPicker: boolean;
  toggleShowCustomTagPicker: () => void;
  disableEditTagsButton: boolean;
  setDisableEditTagsButton: (disable: boolean) => void;
  unsavedTagged: string[];
  currentlyTagging: TagProps | null;
  beginTagging: (tagId: string) => void;
  toggleSoundOnTag: (soundId: string) => void;
  saveTagged: () => Promise<void>;
  discardTagged: () => void;
}

const CustomTagsContext = createContext<CustomTagsContextProps | null>(null);

export const CustomTagsProvider = CustomTagsContext.Provider;

export const useCustomTagsContext = () => {
  const customTagsContext = useContext(CustomTagsContext);

  if (!customTagsContext)
    throw new Error(
      'useSortRules has to be used within <SortRulesProvider>',
    );

  return customTagsContext;
};
