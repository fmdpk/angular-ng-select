import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Person } from "src/app/shared/models/person";
import { concat, Observable, of, Subject } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from "rxjs/operators";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-ng-select",
  templateUrl: "./ng-select.component.html",
  styleUrls: ["./ng-select.component.scss"],
})
export class NgSelectComponent implements OnInit {
  photos = [];
  photosBuffer = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;
  people3$: Observable<Person[]>;
  people3Loading = false;
  people3input$ = new Subject<string>();
  selectedPersons: Person[] = <any>[
    { name: "Karyn Wright" },
    { name: "Other" },
  ];

  constructor(private http: HttpClient, private dataService: DataService) {}

  ngOnInit() {
    this.loadPeople3();
    this.http
      .get<any[]>("https://jsonplaceholder.typicode.com/photos")
      .subscribe((photos) => {
        this.photos = photos;
        this.photosBuffer = this.photos.slice(0, this.bufferSize);
      });
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.photos.length <= this.photosBuffer.length) {
      return;
    }

    if (
      end + this.numberOfItemsFromEndBeforeFetchingMore >=
      this.photosBuffer.length
    ) {
      this.fetchMore();
    }
  }

  private fetchMore() {
    const len = this.photosBuffer.length;
    const more = this.photos.slice(len, this.bufferSize + len);
    this.loading = true;
    // using timeout here to simulate backend API delay
    setTimeout(() => {
      this.loading = false;
      this.photosBuffer = this.photosBuffer.concat(more);
    }, 200);
  }

  customSearchFn(term: string, item: Person) {
    term = term.toLocaleLowerCase();
    return (
      item.name.toLocaleLowerCase().indexOf(term) > -1 ||
      item.gender.toLocaleLowerCase() === term
    );
  }

  trackByFn(item: Person) {
    return item.id;
  }

  private loadPeople3() {
    this.people3$ = concat(
      of([]), // default items
      this.people3input$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.people3Loading = true)),
        switchMap((term) =>
          this.dataService.getPeople(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => (this.people3Loading = false))
          )
        )
      )
    );
  }
}
