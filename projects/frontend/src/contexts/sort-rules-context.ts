import { createContext, useContext } from 'react';
import SortRules from '../models/sort-rules';

interface SortRulesContextProps {
  sortRules: SortRules;
  toggleSmallButtons: () => void;
  toggleFavs: () => void;
  setSearchTerm: (searchTerm: string) => void;
  toggleSoundSortOrder: () => Promise<void>;
  toggleSoundGrouping: () => Promise<void>;
  toggleTagFilter: (tagId: string) => void;
}

const SortRulesContext = createContext<SortRulesContextProps | null>(null);

export const SortRulesProvider = SortRulesContext.Provider;

export const useSortRulesContext = () => {
  const sortRulesContext = useContext(SortRulesContext);

  if (!sortRulesContext)
    throw new Error(
      'useSortRules has to be used within <SortRulesProvider>',
    );

  return sortRulesContext;
};
