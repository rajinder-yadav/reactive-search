import * as songSearch from './search.reducer';

export interface State {
  search: songSearch.State;
}

export const reducers = {
  search: songSearch.reducer
};
