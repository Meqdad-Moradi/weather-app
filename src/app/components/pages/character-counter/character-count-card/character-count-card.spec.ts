import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCountCard } from './character-count-card';

describe('CharacterCountCard', () => {
  let component: CharacterCountCard;
  let fixture: ComponentFixture<CharacterCountCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCountCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterCountCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
