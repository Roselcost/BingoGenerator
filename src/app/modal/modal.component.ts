import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {GeneralService} from '../general.service';
import {transition, trigger, useAnimation} from '@angular/animations';
import {expandAnimation, expandAnimationReverse, inOutAnimationFast, inOutAnimationFastReverse} from '../animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger(
      'inOutAnimationFast',
      [
        transition(
          ':enter',
          [
            useAnimation(inOutAnimationFast)
          ]
        ),
        transition(
          ':leave',
          [
            useAnimation(inOutAnimationFastReverse)
          ]
        )
      ]
    ),
    trigger(
      'expandAnimation',
      [
        transition(
          ':enter',
          [
            useAnimation(expandAnimation)
          ]
        ),
        transition(
          ':leave',
          [
            useAnimation(expandAnimationReverse)
          ]
        )
      ]
    )
  ]
})
export class ModalComponent implements OnInit {
  scrollbarWidth = document.getElementsByTagName('body')[0].style.marginRight;
  @ViewChild('mymodal') mymodal: ElementRef;
  @Input() type = 'warning'; // warning, full or short
  @HostListener('window:keyup.esc') onKeyUp(): void {
    this.cancel();
  }

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }
  accept(): void{
    this.mymodal.nativeElement.style.marginRight = 0;
    this.generalService.modalResponse.next('ok');
  }
  cancel(): void{
    this.mymodal.nativeElement.style.marginRight = 0;
    this.generalService.modalResponse.next('no');
  }
  setFullModal(): string{
    return this.type === 'full' ? 'fullModal' : '';
  }
  setModalStyle(): {}{
    return {
      position: 'absolute',
      'z-index': 505,
      'margin-right': this.scrollbarWidth
    };
  }
}
