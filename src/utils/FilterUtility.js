import {Categories} from '../components/categories/Categories';
import {Sources} from '../components/SearchBar/Sources';

export const initialCategory = {
  id: 0,
  header: 'all',
};

export const getMatchedCategory = input => {
  return (
    Categories.find(c => c.header.toLowerCase() === input.toLowerCase()) || null
  );
};

const getSourceIndex = input => {
  const newInput = input.toLowerCase().replace(/ /g, '').split('.')[0];
  return Sources.findIndex(s => s.toLowerCase().split('.')[0] === newInput);
};

export const getMatchedSource = input => {
  const index = getSourceIndex(input);
  if (index === -1) {
    return null;
  } else {
    return Sources[index];
  }
};
