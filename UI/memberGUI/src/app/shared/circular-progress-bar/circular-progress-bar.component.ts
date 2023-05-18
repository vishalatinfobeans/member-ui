import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-progress-bar',
  templateUrl: './circular-progress-bar.component.html',
  styleUrls: ['./circular-progress-bar.component.scss']
})
export class CircularProgressBarComponent {
  @Input() progress: number = 0;
  calcProgressOffset(): number {
    const circumference = 2 * Math.PI * 15;
    const progressOffset = circumference - (this.progress / 100) * circumference;
    return progressOffset;
  }
}
