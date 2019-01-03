import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMasonryComponent } from './image-masonry.component';

describe('ImageMasonryComponent', () => {
  let component: ImageMasonryComponent;
  let fixture: ComponentFixture<ImageMasonryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageMasonryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageMasonryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
