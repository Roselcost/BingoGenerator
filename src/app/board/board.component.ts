import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {GeneralService} from '../general.service';
import {animateChild, query, transition, trigger} from '@angular/animations';
import {CropperPosition, ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger(
      'animateLeave',
      [
        transition(
          ':leave',
          [
            query('@*', animateChild())
          ]
        )
      ]
    )
  ]
})
export class BoardComponent implements OnInit {
  // Inputs & ViewChilds
  @Input() mode = 'edit'; // View, Edit or Drag
  @ViewChild('bingo') bingo: ElementRef; // To generate image from bingo
  @ViewChild('bingoResult') bingoResult: ElementRef; // To generate image from bingo
  @ViewChildren('image') image: QueryList<any>; // To remove individual image from square
  @ViewChildren('imageextra') imageextra: QueryList<any>; // To remove individual image from extra square
  // Display modals
  displayClearAll = false;
  displayShare = false;
  displayCrop = false;
  // Component variables
  selected = {id: -1, extra: false};
  focused = {id: -1, extra: false};
  dragging = {id: -1, extra: false};
  bingoReady = false; // To show loading when generating bingo image


  constructor(private generalService: GeneralService) {
  }

  ngOnInit(): void {
    this.generalService.initializeSquares();
    // Listen for multiple images event
    this.generalService.uploadMultipleImages.subscribe((files: Blob[]) => {
      files.forEach(async (img: Blob, index: number) => {
        this.generalService.squares[index].img = await this.generalService.fileToImage(img);
      });
    });
  }

  // Getters & Setters
  getString(str): string {
    return this.generalService.getString(str);
  }

  // getMarkerColor(): string {
  //   return this.generalService.markerColor;
  // }

  setMarkerColor(evt): void {
    this.generalService.markerColor = evt;
  }

  getBgColor(): string {
    return this.generalService.bgColor;
  }

  setBgColor(evt): void {
    this.generalService.bgColor = evt;
  }

  getBgImage(): string {
    return this.generalService.bgImage;
  }

  setBgImage(url): void {
    this.generalService.bgImage = url;
  }

  // getBlurBgImage(): number {
  //   return this.generalService.blurBgImage;
  // }
  //
  // setBlurBgImage(value): void {
  //   this.generalService.blurBgImage = value;
  // }

  getBanner(): string {
    return this.generalService.banner;
  }

  setBanner(url): void {
    this.generalService.banner = url;
  }

  getDimensions(dim): number {
    return this.generalService.dimensions[dim];
  }

  setDimensions(coord, dim): void {
    this.generalService.dimensions[coord] = dim;
  }

  getExtras(): number {
    return this.generalService.numExtraSquares;
  }

  setExtras(squares): void {
    this.generalService.numExtraSquares = squares;
  }

  getEventTitle(): string {
    return this.generalService.eventTitle;
  }

  setEventTitle(value): void {
    this.generalService.eventTitle = value;
  }

  getExtraTitle(): string {
    return this.generalService.extraTitle;
  }

  setExtraTitle(value): void {
    this.generalService.extraTitle = value;
  }

  getSquares(): ReadonlyArray<{}> {
    return this.generalService.squares;
  }

  getExtraSquares(): ReadonlyArray<{}> {
    return this.generalService.extraSquares;
  }

  toggleBlur(): void {
    const blurOrNot = !this.generalService.squares[0].blur; // Check the first square
    this.generalService.squares.forEach(a => {
      a.blur = blurOrNot;
    });
    this.generalService.extraSquares.forEach(a => {
      a.blur = blurOrNot;
    });
  }

  getNumberLines(): number {
    return this.generalService.numberLines;
  }

  getImageSquare(i, extra = false): string {
    if (extra) {
      return this.generalService.extraSquares[i].img;
    }
    return this.generalService.squares[i].img;
  }

  getSquareName(i): string {
    return this.generalService.squares[i].name;
  }

  markSquare(mode, i): void {
    if (this.mode === 'view') {
      if (mode === 'e') {
        this.generalService.extraSquares[i].marked = !this.generalService.extraSquares[i].marked;
      } else {
        this.generalService.squares[i].marked = !this.generalService.squares[i].marked;
        this.generalService.getOptLines(i, this.generalService.squares[i].marked);
      }
    }
  }

  markedSquares(): number {
    return this.generalService.squares.slice(0, this.generalService.dimensions[0] *
      this.generalService.dimensions[1]).filter(a => a.marked).length;
  }

  markedExtras(): number {
    return this.generalService.extraSquares.filter(a => a.marked).length;
  }

  // Style functions
  setOuterStyle(): {} {
    const incr = this.generalService.numExtraSquares ? 80 : 0;
    const height = Math.ceil(this.generalService.numExtraSquares / Math.max(5, this.generalService.dimensions[1])); // Height extra squares
    const realW = this.generalService.dimensions[1] * 100;
    const realH = (this.generalService.dimensions[0] + height) * 100 + 80 + incr;
    return {
      width: realW + 'px',
      height: realH + 'px', // Height squares + height extra squares + height both headers
      'min-width': 'min(500px, 100%)',
      position: 'relative',
      overflow: 'hidden'
    };
  }

  setBingoBgStyle(): {} {
    const incr = this.generalService.numExtraSquares ? 80 : 0;
    const height = Math.ceil(this.generalService.numExtraSquares / Math.max(5, this.generalService.dimensions[1]));
    const img = this.generalService.cropBgImage === '' ? this.generalService.bgImage : this.generalService.cropBgImage;
    return {
      width: this.generalService.dimensions[1] * 100 + 'px',
      height: (this.generalService.dimensions[0] + height) * 100 + 80 + incr + 'px',
      filter: (this.generalService.blurBgImage > 0) ? 'blur(' + this.generalService.blurBgImage * 2 + 'px)' : '',
      transform: (this.generalService.blurBgImage > 0) ? 'scale(1.1)' : '',
      'min-width': '500px',
      'background-image': 'url(\'' + img + '\')',
      'background-size': 'cover'
    };
  }

  setStyleSquare(square, index, extra = false): {} {
    const borderWidth = '1px';
    let bord;
    if (extra) {
      bord = '1px solid goldenrod';
    } else if (this.generalService.colorScheme === 'light') {
      bord = '1px solid black';
    } else {
      bord = '1px solid #ffffff57';
      // Defining borders
      /*      if (!extra && !(this.mode === 'move')){
              if ((index + 1) === this.generalService.dimensions[0] * this.generalService.dimensions[1]) {
                // Square in last row and last column
                borderWidth = '1px';
              } else if ((index + 1) % this.generalService.dimensions[1] === 0) {
                // Square in last row
                borderWidth = '1px 1px 0 1px';
              } else if (this.generalService.dimensions[1] * (this.generalService.dimensions[0] - 1) < (index + 1)) {
                // Square in last column
                borderWidth = '1px 0 1px 1px';
              } else {
                // Every other square
                borderWidth = '1px 0 0 1px';
              }
            }*/
    }


    const padd = this.mode === 'edit' ? '0' : '5px';
    const bgcolor = square.marked ? this.generalService.markerColor : '';
    return {
      position: 'relative',
      'background-color': bgcolor,
      border: bord,
      padding: padd,
      'border-width': borderWidth,
      transition: 'background-color 0.2s ease',
      'border-radius': (this.generalService.roundBorderSquares * 2) + 'px',
      width: (100 - this.generalService.separatedSquares * 2) + 'px',
      height: (100 - this.generalService.separatedSquares * 2) + 'px',
      overflow: 'hidden'
    };
  }

  setTextAreaStyle(i, extra = false): {} {
    const hgt = this.getFocused(i, extra) ? '70px' : '100%';
    const clr = this.generalService.colorScheme === 'light' ? 'black' : 'white';
    const textShadow = this.generalService.colorScheme === 'light' ? '' : '0px 0px 5px #000';
    return {
      height: hgt,
      color: clr,
      'text-shadow': textShadow,
      resize: 'none',
      width: '100%',
      'text-align': 'center'
    };
  }

  setStyleButtonsSquare(i, extra = false): {} {
    const disp = this.getFocused(i, extra) ? '' : 'none';
    return {
      display: disp
    };
  }

  setFontSize(evt): {} {
    let clr;
    let textShadow;
    if (this.generalService.colorScheme === 'light') {
      clr = 'black';
      textShadow = '';
    } else {
      clr = 'white';
      textShadow = '0px 0px 5px #000';
    }
    let fontsize = 14;
    while (parseFloat(document.defaultView.getComputedStyle(evt).height.replace('px', '')) > 100 && fontsize > 8) {
      --fontsize;
      evt.style.fontSize = fontsize + 'px';
    }
    return {
      'font-size': fontsize,
      color: clr,
      'text-shadow': textShadow
    };
  }

  setHeaderStyle(evt): {} {
    let fontsize = 24;
    const textShadow = this.generalService.colorScheme === 'light' ? '' : '0 0 5px #000';
    const clr = this.generalService.colorScheme === 'light' ? 'black' : 'white';
    while (parseFloat(document.defaultView.getComputedStyle(evt).height.replace('px', '')) > 80 && fontsize > 8) {
      --fontsize;
      evt.style.fontSize = fontsize + 'px';
    }
    return {
      'max-width': this.generalService.dimensions[1] < 5 ? '500px' : this.generalService.dimensions[1] * 100 + 'px',
      'font-size': fontsize,
      color: clr,
      'text-shadow': textShadow,
      position: 'relative',
      margin: 0,
      padding: '0 0 0 10px',
      'word-wrap': 'break-word',
      'z-index': 1
    };
  }

  setHeaderInputStyle(): {} {
    const clr = this.generalService.colorScheme === 'light' ? 'black' : 'white';
    return {
      color: clr
    };
  }

  setInnerStyle(): {} {
    return {
      width: this.generalService.dimensions[1] * 100 + 'px',
      height: this.generalService.dimensions[0] * 100 + 'px',
      margin: 'auto'
    };
  }

  setBgSquareStyle(/*i, ext = false*/): {} {
    return {
      'border-radius': (this.generalService.roundBorderSquares * 2) + 'px',
      width: (100 - this.generalService.separatedSquares * 2) + 'px',
      height: (100 - this.generalService.separatedSquares * 2) + 'px',
      margin: this.generalService.separatedSquares + 'px',
      cursor: this.mode === 'move' ? 'grab' : '',
      /*transform: this.getDragging(i, ext) ? 'scale(0.9)' : ''*/
    };
  }

  setBgSquareStyleInner(i, extra = false): {} {
    let square = this.generalService.squares[i];
    if (extra) {
      square = this.generalService.extraSquares[i];
    }
    const img = square.cropImg === '' ? square.img : square.cropImg;
    return {
      'background-image': 'url(\'' + img + '\')',
      'background-size': 'cover',
      filter: square.blur ? 'blur(' + 2 + 'px)' : '',
      transform: square.blur ? 'scale(1.1)' : '',
      transition: 'filter transform 0.2s ease',
    };
  }

  setBannerStyles(): {} {
    const img = this.generalService.cropBanner === '' ? this.generalService.banner : this.generalService.cropBanner;
    return {
      'background-image': 'url(\'' + img + '\')',
      'background-size': 'cover'
    };
  }

  getStyleSpecial(): {} {
    if (this.generalService.numberLines === this.generalService.dimensions[0] + this.generalService.dimensions[1]) {
      return {
        'font-size': '30px',
        background: '-webkit-linear-gradient(45deg, #DAA520, #FFDA75 80%)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent'

      };
    } else if (this.generalService.numberLines > 0) {
      return {color: 'goldenrod'};
    }
  }

  // Modal handling
  editSquare(m, i, ext = false): void {
    this.displayCrop = true;
    this.selected = {
      id: i,
      extra: ext
    };
    this.generalService.getModal()
      .then(() => {
        this.displayCrop = false;
      })
      .catch(() => this.displayCrop = false);
  }

  clearAll(): void {
    this.displayClearAll = true;
    this.generalService.getModal()
      .then(() => {
        this.generalService.numberLines = 0;
        this.generalService.squares.forEach((a) => a.marked = false);
        this.generalService.extraSquares.forEach((a) => a.marked = false);
        this.displayClearAll = false;
      })
      .catch(() => this.displayClearAll = false);
  }

  share(): void {
    this.bingoReady = false;
    this.displayShare = true;
    this.generalService.generateImageFromDOM(this.bingo.nativeElement)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        this.bingoResult.nativeElement.firstChild.src = img.src;
        this.bingoReady = true;
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
    this.generalService.getModal()
      .then(() => {
        this.displayShare = false;
      })
      .catch(() => this.displayShare = false);
  }

  // Actions
  getSpecial(): string {
    if (this.generalService.numberLines === this.generalService.dimensions[0] + this.generalService.dimensions[1]) {
      return 'BINGO!!!!';
    } else if (this.generalService.numberLines > 0) {
      return this.getString('line').toUpperCase() + '!';
    }
  }

  setFocused(i, ext = false): void {
    this.focused = {
      id: i,
      extra: ext
    };
  }

  setDragging(i, ext = false): void {
    this.dragging = {
      id: i,
      extra: ext
    };
    console.log(this.dragging);
  }

  /*  sortOptions(ext = false){
      return {
        'disabled': this.mode !== 'move',
        onStart: (event: any) => {
          this.setDragging(-1, ext);
        },
        onChoose: (event: any) => {
          this.setDragging(event.oldIndex, ext);
        }
      };
    }*/

  getFocused(i, extra = false): boolean {
    return (this.focused.id === i && this.focused.extra === extra && this.mode === 'edit');
  }

  /*  getDragging(i, extra = false){
      return (this.dragging.id === i && this.dragging.extra === extra && this.mode === 'move');
    }*/

  shuffle(): void {
    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    // for (let i = this.generalService.squares.length - 1; i > 0; i--) { Modified loop, so only the visible squares are shuffled
    for (let i = this.generalService.dimensions[0] * this.generalService.dimensions[1] - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.generalService.squares[i];
      this.generalService.squares[i] = this.generalService.squares[j];
      this.generalService.squares[j] = temp;
    }
    // And do the same with extra squares
    for (let i = this.generalService.numExtraSquares - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.generalService.extraSquares[i];
      this.generalService.extraSquares[i] = this.generalService.extraSquares[j];
      this.generalService.extraSquares[j] = temp;
    }
  }

  async uploadImage(image, index, directive, extra = false): Promise<void> {
    // const imgs = [];
    let square;
    if (extra) {
      square = this.generalService.extraSquares[index];
    } else {
      square = this.generalService.squares[index];
    }
    if (image != null && image !== '') {
      // Image has been uploaded
      if (!directive) { // Origin: Upload event
        image = image.target.files[0];
      } else if (directive) { // Origin: Drop & FileUpload output (both return File[])
        image = image[0];
      }
      const resp = await this.generalService.compressAndFiletoImage(image);
      if (!resp.error) {
        square.img = resp.value;
      }
    } else {
      // Image has been removed
      square.img = '';
    }
    // In any case, cropping resets
    square.offsetW = 0;
    square.offsetH = 0;
    square.cropImg = '';
  }

  removeImage(index, extra = false): void {
    let square;
    if (extra) {
      square = this.generalService.extraSquares[index];
      this.imageextra.toArray()[index].nativeElement.value = '';
    } else {
      square = this.generalService.squares[index];
      this.image.toArray()[index].nativeElement.value = '';
    }

    square.offsetW = 0;
    square.offsetH = 0;
    square.img = '';
    square.cropImg = '';
  }

  downloadBingo(): void {
    const link = document.createElement('a');
    link.download = (this.generalService.eventTitle !== '' && this.generalService.eventTitle != null ? this.generalService.eventTitle : 'bingogenerator') + '.png';
    link.href = this.bingoResult.nativeElement.firstChild.src;
    link.click();
  }

  // Crop handling
  imageCropped(event: ImageCroppedEvent, extra = false): void {
    // imageCropped gets triggered several times and there's no way to avoid it, so I'm setting a timeout of 50ms.
    // Offsets won't be able to be changed in this time. I think no one is that fast...
    // I don't like to use this but I don't see any alternatives. I tried with the other outputs, but they get triggered asynchronously
    // and it's not possible to do anything with that.
    if (!this.generalService.cropTimer) {
      let square = this.generalService.squares[this.selected.id];
      if (extra) {
        square = this.generalService.extraSquares[this.selected.id];
      }
      square.offsetW = event.cropperPosition.x1;
      square.offsetH = event.cropperPosition.y1;
      square.cropImg = event.base64;
    }
  }

  getSelectedCoordinates(): CropperPosition {
    return this.generalService.cropper;
  }

  imageLoaded(): void {
    this.generalService.cropTimer = true;
    setTimeout(() => {
      this.generalService.cropTimer = false;
    }, 100);
  }

  cropReady(evt, extra = false): void {
    let square = this.generalService.squares[this.selected.id];
    if (extra) {
      square = this.generalService.extraSquares[this.selected.id];
    }
    this.generalService.cropper = {
      x1: square.offsetW,
      y1: square.offsetH,
      x2: square.offsetW + 150,
      y2: square.offsetH + 150
    };
  }
}
