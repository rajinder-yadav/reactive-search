import { Action } from '@ngrx/store';

export const SEARCH = 'Songs::Search';
export const SEARCH_RESULT = 'Songs::Search Result';

export class Search implements Action {
  readonly type = SEARCH;
  constructor(public playload: string) {}
}

export class SearchResult implements Action {
  readonly type = SEARCH_RESULT;
  constructor(public playload: string[]) {}
}

export type All = Search | SearchResult;
