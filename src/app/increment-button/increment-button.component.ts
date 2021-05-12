import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-increment-button',
  templateUrl: './increment-button.component.html',
  styleUrls: ['./increment-button.component.css']
})
export class IncrementButtonComponent implements OnInit {
  @Input() value = 0;
  @Input() topLimit = 10;
  @Input() bottomLimit = 0;
  @Output() modified = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  changeVal(incr): void{
    if (incr === -1 && this.value > this.bottomLimit) this.value -= 1;
    else if (incr === 1 && this.value < this.topLimit) this.value += 1;
    this.modified.emit(this.value);
  }
}
