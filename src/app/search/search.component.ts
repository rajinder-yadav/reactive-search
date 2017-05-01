import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { Store } from '@ngrx/store';
import * as SearchActions from '../search.actions';
import * as fromRoot from '../reducers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, AfterViewInit {

  term$: Observable<string>;
  albums$: Observable<string[]>;

  form: FormGroup;
  search = new FormControl('');

  constructor(
    public store: Store<fromRoot.State>,
    public fb: FormBuilder ) {
      this.term$ = store.select(state => state.search.searchTerm);
      this.albums$ = store.select(state => state.search.album);
    }

  ngOnInit() {
    this.form = this.fb.group({
      search: this.search
    });
  }

  ngAfterViewInit() {
    this.search.valueChanges
      .debounceTime(200)
      .subscribe(term => this.store.dispatch(new SearchActions.Search(term)));

    // this.album$ =
    // this.word$
    //   .switchMap(v =>
    //     this.http.get(`https://api.spotify.com/v1/search?q=${v}&type=album`)
    //         .map(res => res.json())
    //         .catch(err => Observable.empty())
    //   )
    //   .map(data => data.albums)
    //   .do(v => console.log(v))
    //   .map(data => data.items);
      // .subscribe(data => this.albums = data.items);
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
