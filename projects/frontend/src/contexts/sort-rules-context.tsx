import React, { FC, createContext, useContext, useCallback, useState, useMemo, ReactNode } from 'react';
import SortRules from '../models/sort-rules';
import usePrefs from '../hooks/use-prefs';

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

export const useSortRules = () => {
  const sortRulesContext = useContext(SortRulesContext);

  if (!sortRulesContext)
    throw new Error(
      'useSortRules has to be used within <SortRulesProvider>',
    );

  return sortRulesContext;
};

interface SortRulesProviderProps {
  children: ReactNode;
}

const SortRulesProvider: FC<SortRulesProviderProps> = ({ children }) => {
  const prefs = usePrefs();

  const [sortRules, setSortRules] = useState<SortRules>({ favorites: false, small: false, searchTerm: '', sortOrder: prefs.sort, groups: prefs.groups, tags: new Array<string>() });

  const toggleSmallButtons = useCallback(() => {
    setSortRules(oldState => ({ ...oldState, small: !oldState.small }));
  }, [sortRules.small]);

  const toggleFavs = useCallback(() => {
    setSortRules(oldState => ({ ...oldState, favorites: !oldState.favorites }));
  }, [sortRules.favorites]);

  const setSearchTerm = useCallback((searchTerm: string) => {
    setSortRules(oldState => ({ ...oldState, searchTerm }));
  }, [sortRules.searchTerm]);

  const toggleSoundSortOrder = useCallback(async () => {
    let newOrder = 'A-Z';
    if (sortRules.sortOrder === 'A-Z') newOrder = 'Date - New';
    else if (sortRules.sortOrder === 'Date - New') newOrder = 'Date - Old';
    setSortRules(oldState => ({ ...oldState, sortOrder: newOrder }));
    await fetch(`/api/prefs/setsortorder/${ newOrder }`, { method: 'PUT' });
  }, [sortRules.sortOrder]);

  const toggleSoundGrouping = useCallback(async () => {
    let newMode = 'none';
    if (sortRules.groups === 'none') newMode = 'start';
    if (sortRules.groups === 'start') newMode = 'end';
    setSortRules(oldState => ({ ...oldState, groups: newMode }));
    await fetch(`/api/prefs/setgroups/${ newMode }`, { method: 'PUT' });
  }, [sortRules.groups]);

  const toggleTagFilter = useCallback((tagId: string) => {
    const newTagRules = [...sortRules.tags];
    const index = newTagRules.indexOf(tagId);
    if (index >= 0) newTagRules.splice(index, 1);
    else newTagRules.push(tagId);
    setSortRules(oldState => ({ ...oldState, tags: newTagRules }));
  }, [sortRules.tags]);

  const context = useMemo(() => ({
    sortRules,
    toggleSmallButtons,
    toggleFavs,
    setSearchTerm,
    toggleSoundSortOrder,
    toggleSoundGrouping,
    toggleTagFilter,
  }), [sortRules]);

  return (
    <SortRulesContext.Provider value={ context }>
      { children }
    </SortRulesContext.Provider>
  );
};

export default SortRulesProvider;
