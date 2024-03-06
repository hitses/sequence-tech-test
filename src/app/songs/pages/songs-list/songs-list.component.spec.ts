import { ComponentFixture, TestBed } from '@angular/core/testing';

import SongsComponent from '@songs/pages/songs-list/songs-list.component';

describe('SongsComponent', () => {
  let component: SongsComponent;
  let fixture: ComponentFixture<SongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
