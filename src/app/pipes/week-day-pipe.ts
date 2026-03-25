import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekDay',
})
export class WeekDayPipe implements PipeTransform {
  transform(dateValue: string): string {
    const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateValue);
    let dayIdx = date.getDay();
    const todayIdx = new Date().getDay();

    if (dayIdx === todayIdx) {
      weekdayNames.splice(todayIdx, 1, 'Today');
    }

    return weekdayNames[dayIdx];
  }
}
