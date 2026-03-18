import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherDisplay } from './current-weather-display';

describe('CurrentWeatherDisplay', () => {
  let component: CurrentWeatherDisplay;
  let fixture: ComponentFixture<CurrentWeatherDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentWeatherDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
