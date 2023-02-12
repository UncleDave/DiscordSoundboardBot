export default interface SortRules {
  favorites: boolean;
  small: boolean;
  searchTerm: string,
  sortOrder: (string & {}) | 'A-Z' | 'Date - New' | 'Date - Old';
  groups: (string & {}) | 'none' | 'start' | 'end';
  tags: string[];
}
