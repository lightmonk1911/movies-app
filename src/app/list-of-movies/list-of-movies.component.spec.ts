import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfMoviesComponent } from './list-of-movies.component';

describe('ListOfMoviesComponent', () => {
  let component: ListOfMoviesComponent;
  let fixture: ComponentFixture<ListOfMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
