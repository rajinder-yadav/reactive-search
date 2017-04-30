import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  search = new FormControl('');

  word$: Observable<string>;
  // albums: string[];
  album$: Observable<string[]>;

  constructor(
    public fb: FormBuilder,
    public http: Http) { }

  ngOnInit() {
    this.form = this.fb.group({
      search: this.search
    });
  }

  ngAfterViewInit() {
    this.word$ = this.search.valueChanges
                            .debounceTime(200);

    this.album$ =
    this.word$
      .switchMap(v =>
        this.http.get(`https://api.spotify.com/v1/search?q=${v}&type=album`)
            .map(res => res.json())
            .catch(err => Observable.empty())
      )
      .map(data => data.albums)
      .do(v => console.log(v))
      .map(data => data.items);
      // .subscribe(data => this.albums = data.items);
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
