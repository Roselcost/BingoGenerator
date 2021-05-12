import {animation, animate, style} from '@angular/animations';

export const inOutAnimationFast = animation([
  style({ opacity: 0 }),
  animate('0.2s ease-out',
    style({ opacity: 0.5 }))
]);
export const inOutAnimationFastReverse = animation([
  style({ opacity: 0.5 }),
  animate('0.2s ease-out',
    style({ opacity: 0 }))
]);
export const expandAnimation = animation([
  style({ opacity: 0, transform: 'scale(0.9)'}),
  animate('0.3s ease',
    style({ opacity: 1, transform: 'scale(1)'}))
]);
export const expandAnimationReverse = animation([
  style({ opacity: 1, transform: 'scale(1)'}),
  animate('0.3s ease',
    style({ opacity: 0, transform: 'scale(0.9)'}))
]);
