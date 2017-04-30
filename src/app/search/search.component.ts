import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  search = new FormControl('');

  word$: Observable<string>;

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      search: this.search
    });
  }

  ngAfterViewInit() {
    this.word$ = this.search.valueChanges
                            .debounceTime(200);
    this.word$
      .subscribe(v => console.log(v));
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
