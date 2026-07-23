import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherDetails } from './current-weather-details';

describe('CurrentWeatherDetails', () => {
  let component: CurrentWeatherDetails;
  let fixture: ComponentFixture<CurrentWeatherDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentWeatherDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Temperature');
    fixture.componentRef.setInput('value', '25°C');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
