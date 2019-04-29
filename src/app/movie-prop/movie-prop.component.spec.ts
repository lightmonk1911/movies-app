import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePropComponent } from './movie-prop.component';

describe('MoviePropComponent', () => {
  let component: MoviePropComponent;
  let fixture: ComponentFixture<MoviePropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviePropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
