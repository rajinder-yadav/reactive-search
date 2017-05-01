import { Action } from '@ngrx/store';

export const SEARCH = "Songs::Search";
export const SEARCH_SUCCESS = "Songs::Search Success";

export class Search implements Action {
  readonly type = SEARCH;
  constructor(public playload: string) {}
}

export class SearchSuccess implements Action {
  readonly type = SEARCH_SUCCESS;
  constructor(public playload: string[]) {}
}
export type All = Search | SearchSuccess;
