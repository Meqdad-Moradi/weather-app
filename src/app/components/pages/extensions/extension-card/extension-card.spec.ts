import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionCard } from './extension-card';

describe('ExtensionCard', () => {
  let component: ExtensionCard;
  let fixture: ComponentFixture<ExtensionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtensionCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtensionCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('extension', {
      id: 'test-extension',
      name: 'Test Extension',
      description: 'This is a test extension.',
      version: '1.0.0',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
