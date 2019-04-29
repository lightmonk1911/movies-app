import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedPageComponent } from './watched-page.component';

describe('WatchedPageComponent', () => {
  let component: WatchedPageComponent;
  let fixture: ComponentFixture<WatchedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
