import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';
import {SortablejsModule} from 'ngx-sortablejs';
import { IncrementButtonComponent } from './increment-button/increment-button.component';
import {ColorPickerModule} from 'ngx-color-picker';
import { ModalComponent } from './modal/modal.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import {DragndropuploadDirective} from './dragndropupload.directive';
import {ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { LoadingComponent } from './loading/loading.component';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    IncrementButtonComponent,
    DragndropuploadDirective,
    ModalComponent,
    ImageuploadComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    ShareButtonsModule,
    ShareIconsModule,
    SortablejsModule.forRoot({
      animation: 0,
      forceFallback: true,
      delayOnTouchOnly: true,
      delay: 100
    }),
    ColorPickerModule,
    ImageCropperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
