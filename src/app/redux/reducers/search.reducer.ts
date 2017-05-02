import * as SearchActions from '../actions/search.actions';

export interface State {
  searchTerm: string;
  albums: string[];
}

const initialState: State = {
  searchTerm: '',
  albums: []
};

export function reducer(state: State = initialState, action: SearchActions.All): State {

  switch (action.type) {
    case SearchActions.SEARCH: {
      return {
        ...state,
        searchTerm: action.playload
      };
    }

    case SearchActions.SEARCH_RESULT: {
      return {
        ...state,
        albums: action.playload
      };
    }

    default: {
      return state;
    }
  } // switch

}
