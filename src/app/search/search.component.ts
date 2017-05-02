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
import * as SearchActions from '../redux/actions/search.actions';
import * as fromRoot from '../redux/reducers';

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

  constructor(
    public store: Store<fromRoot.State>,
    public fb: FormBuilder ) {
      this.term$ = store.select(fromRoot.selectSearchTerm);
      this.albums$ = store.select(fromRoot.selectAlbums);
    }

  ngOnInit() {
    this.form = this.fb.group({
      search: ''
    });
  }

  ngAfterViewInit() {
    this.form.get('search').valueChanges
      .debounceTime(200)
      .subscribe(term => this.store.dispatch(new SearchActions.Search(term)));
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
