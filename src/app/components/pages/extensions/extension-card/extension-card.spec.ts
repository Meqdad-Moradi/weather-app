import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionCard } from './extension-card';

describe('ExtensionCard', () => {
  let component: ExtensionCard;
  let fixture: ComponentFixture<ExtensionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtensionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
