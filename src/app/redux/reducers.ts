import * as songSearch from './reducers/search.reducer';

export interface State {
  search: songSearch.State;
}

export const reducers = {
  search: songSearch.reducer
};

export function selectSearchTerm(state: State) {
  return state.search.searchTerm;
}

export function selectAlbums(state: State) {
  return state.search.albums;
}
