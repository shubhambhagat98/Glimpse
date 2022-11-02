import create from 'zustand';

export const useStore = create(set => ({
  keyword: '',
  activeCategory: {
    id: 0,
    header: 'all',
  },

  setKeyword: keyword =>
    set(state => ({
      ...state,
      keyword: keyword,
    })),

  setActiveCategory: activeCategory =>
    set(state => ({
      ...state,
      activeCategory,
    })),
}));
