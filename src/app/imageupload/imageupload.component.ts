import {Component, Input, OnInit, EventEmitter, Output, ViewChild, ElementRef} from '@angular/core';
import {GeneralService} from '../general.service';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {
  @Input() realpath;
  @Input() columnName;
  @Input() path;
  @Output() uploadImage = new EventEmitter();
  @ViewChild('fileDropRef') fileDropRef: ElementRef;
  @Input() multiple = false;
  @Input() compress = false;
  @Input() compDims;
  name: string;
  loading;
  removing;

  constructor(private generalService: GeneralService) {
  }

  ngOnInit(): void {
    if (this.realpath == null){
      this.realpath = '';
    }
    this.loading = false;
    this.removing = false;
  }
  getString(str): string{
    return this.generalService.getString(str);
  }

  async uploadFile(event, origin): Promise<void> {
    this.loading = true;
    const imgs = [];
    if (origin === 'change') { // Files originating from drop are already a File[]
      event = event.target.files;
    }
    for (let file of event) {
      const fileType = file.type;
      if (!['image/gif', 'image/jpeg', 'image/png'].includes(fileType)) {
        alert(this.getString('alertNotImage'));
      }
      else{
        if (this.compress && fileType !== 'image/gif'){
          file = await this.generalService.doCompress(file, this.compDims);
        }
        imgs.push(file);
      }
    }
    if (imgs.length > 0){
      this.uploadImage.emit(imgs); // File[]
    }
    this.loading = false;
  }

  removeImage(): void {
    this.fileDropRef.nativeElement.value = '';
    this.realpath = '';
    this.removing = false;
    this.uploadImage.emit('');
  }
}
