import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDragndropupload]'
})
export class DragndropuploadDirective {
  @Output() fileDropped = new EventEmitter();
  @HostBinding('class.fileover') fileOver: boolean;
  @HostListener('dragover', ['$event']) onDragOver(evt): void{
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt): void{
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }
  @HostListener('drop', ['$event']) public ondrop(evt): void{
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0){
      this.fileDropped.emit(files);
    }
  }

  constructor() { }

}
