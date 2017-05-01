import * as SearchActions from './search.actions';

export interface State {
  searchTerm: string;
  album: string[];
}

const initialState: State = {
  searchTerm: '',
  album: []
};

export function reducer(state: State = initialState, action: SearchActions.All): State {

  switch (action.type) {
    case SearchActions.SEARCH: {
      return {
        ...state,
        searchTerm: action.playload
      };
    }

    case SearchActions.SEARCH_SUCCESS: {
      return {
        ...state,
        album: action.playload
      };
    }

    default: {
      return state;
    }
  } // switch

}
