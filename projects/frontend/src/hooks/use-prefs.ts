import cookies from 'js-cookie';
import Prefs from '../models/prefs';

const prefs: Prefs = { groups: cookies.get('groupspref')! };

const usePrefs = (): Prefs => prefs;

export default usePrefs;
