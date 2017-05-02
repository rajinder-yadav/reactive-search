import { Observable } from 'rxjs/Observable';

import 'rxjs/operator/map';
import 'rxjs/operator/switchMap';

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as SearchActions from '../actions/search.actions';

@Injectable()
export class AlbumEffects {

  @Effect() search$: Observable<Action> =
    this.actions$.ofType(SearchActions.SEARCH)
      .map((action: SearchActions.Search) => action.playload)
      .switchMap(v =>
        this.http.get(`https://api.spotify.com/v1/search?q=${v}&type=album`)
            .map(res => res.json())
            .catch(err => Observable.empty())
      )
      .map(data => data.albums)
      .do(v => console.log(v))
      .map(data => new SearchActions.SearchResult(data.items));

  constructor(
    public http: Http,
    public actions$: Actions) {
  }
}
