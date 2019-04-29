import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortMovieComponent } from './short-movie.component';

describe('ShortMovieComponent', () => {
  let component: ShortMovieComponent;
  let fixture: ComponentFixture<ShortMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
