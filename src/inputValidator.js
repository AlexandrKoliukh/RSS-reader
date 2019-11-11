import isURL from 'validator/lib/isURL';
import { isUrlFetched, setStateValue } from './store';

export default (e) => {
  const { value } = e.target;
  const isValidUrl = isURL(value.trim()) && !isUrlFetched(value.trim());
  setStateValue('isValid', isValidUrl);
};
