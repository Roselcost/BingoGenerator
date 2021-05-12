import {Component, HostListener, OnInit} from '@angular/core';
import {GeneralService} from './general.service';
import {animateChild, query, transition, trigger} from '@angular/animations';
import {CropperPosition, ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
export class AppComponent implements OnInit {
  // Display modals
  displayOptions = false;
  displayHelp = false;
  displayMultipleImages = false;
  displayReset = false;
  displayBgImage = false;
  displayBanner = false;
  displaySave = false;
  // General options
  mode = 'edit';
  resetBingo = false;
  // Color Palettes
  palettes = [
    {marker: '#DE8A44', bg: '#FACE92'}, {marker: '#893168', bg: '#4A1942'}, {marker: '#68D89B', bg: '#407860'},
    {marker: '#AF4025', bg: '#74121D'}, {marker: '#ffb6ac', bg: '#ff9696'}, {marker: '#508991', bg: '#172A3A'},
    {marker: '#3A5A40', bg: '#588157'}, {marker: '#82AD53', bg: '#404D2B'}, {marker: '#555d76', bg: '#2f3033'}
  ];
  // Save file
  // saveFile = '';
  // saveFileName = '';

  @HostListener('window:beforeunload', ['$event'])
  handleClose($event): void {
    if (!this.resetBingo) {
      $event.returnValue = false;
      alert('Are you sure you want to exit? Images will need to be reuploaded');
    }
  }

  constructor(private generalService: GeneralService) {
  }

  ngOnInit(): void {
    const language = localStorage.getItem('language');
    this.generalService.language = language != null && language !== '' && ['en', 'es', 'ca'/*, 'fr', 'de', 'it', 'jp'*/].includes(language)
      ? language : 'en';
    localStorage.setItem('language', this.generalService.language);
    const theme = localStorage.getItem('theme') != null && localStorage.getItem('theme') !== '' ? localStorage.getItem('theme') : 'dark';
    this.setTheme(theme);
  }

  // Getters & Setters
  getString(str): string {
    return this.generalService.getString(str);
  }

  getTheme(): string {
    return this.generalService.theme;
  }

  setTheme(theme): void {
    const body = document.getElementsByTagName('body')[0];
    theme === 'light' ? body.classList.add('light') : body.classList.remove('light');
    localStorage.setItem('theme', theme);
    this.generalService.theme = theme;
  }

  getSeparatedSquares(): number {
    return this.generalService.separatedSquares;
  }

  setSeparatedSquares(value): void {
    this.generalService.separatedSquares = value;
  }

  getRoundBorderSquares(): number {
    return this.generalService.roundBorderSquares;
  }

  setRoundBorderSquares(value): void {
    this.generalService.roundBorderSquares = value;
  }

  getMarkerColor(): string {
    return this.generalService.markerColor;
  }

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

  async setBgImage(value): Promise<void> {
    value = await this.generalService.fileToImage(value[0]);
    this.generalService.cropBgImage = '';
    this.generalService.cropStateBgImage = null;
    this.generalService.bgImage = value;
  }

  getBlurBgImage(): number {
    return this.generalService.blurBgImage;
  }

  setBlurBgImage(value): void {
    this.generalService.blurBgImage = value;
  }

  getBanner(): string {
    return this.generalService.banner;
  }

  async setBanner(value): Promise<void> {
    value = await this.generalService.fileToImage(value[0]);
    this.generalService.cropBanner = '';
    this.generalService.cropStateBanner = null;
    this.generalService.banner = value;
  }

  getDimensions(dim): number {
    return this.generalService.dimensions[dim];
  }

  setDimensions(coord, dim): void {
    this.generalService.dimensions[coord] = dim;
    this.generalService.getLines();
  }

  getExtras(): number {
    return this.generalService.numExtraSquares;
  }

  setExtras(squares): void {
    this.generalService.numExtraSquares = squares;
  }

  getColorScheme(): string {
    return this.generalService.colorScheme;
  }

  setColorScheme(value): void {
    this.generalService.colorScheme = value;
  }

  setPalette(marker, bg): void {
    this.generalService.markerColor = marker;
    this.generalService.bgColor = bg;
  }

  changeLanguage(language): void {
    localStorage.setItem('language', language);
    this.generalService.language = language;
  }

  getLanguage(): string {
    return this.generalService.language;
  }

  uploadImages(evt): void {
    const body = document.getElementsByTagName('body')[0];
    body.style.marginRight = '';
    body.style.overflow = '';
    this.generalService.uploadMultipleImages.next(evt);
    this.displayMultipleImages = false;
  }

  // Modal handling
  showHelp(): void {
    this.displayHelp = true;
    this.generalService.getModal()
      .then(() => {
        this.displayHelp = false;
      })
      .catch(() => this.displayHelp = false);
  }

  showOptions(): void {
    this.displayOptions = true;
    this.generalService.getModal()
      .then(() => {
        this.displayOptions = false;
      })
      .catch(() => this.displayOptions = false);
  }

  showMultipleImages(): void {
    this.displayMultipleImages = true;
    this.generalService.getModal()
      .then(() => {
        this.displayMultipleImages = false;
      })
      .catch(() => this.displayMultipleImages = false);
  }

  showBgImage(): void {
    this.displayBgImage = true;
    this.generalService.getModal()
      .then(() => {
        this.displayBgImage = false;
      })
      .catch(() => this.displayBgImage = false);
  }

  showBanner(): void {
    this.displayBanner = true;
    this.generalService.getModal()
      .then(() => {
        this.displayBanner = false;
      })
      .catch(() => this.displayBanner = false);
  }

  showReset(): void {
    this.displayReset = true;
    this.generalService.getModal()
      .then(() => {
        this.resetBingo = true;
        location.reload(); // This is very cheap but effective :)
        this.displayReset = false;
      })
      .catch(() => this.displayReset = false);
  }

  showSave(): void {
    this.displaySave = true;
    /*    const saveJSON = this.prepareFile();
        this.saveFile = 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(saveJSON));
        this.saveFileName = (this.generalService.eventTitle !== '' && this.generalService.eventTitle != null ?
        this.generalService.eventTitle : 'bingogenerator') + '.json';*/
    this.generalService.getModal()
      .then(() => {
        this.displaySave = false;
      })
      .catch(() => this.displaySave = false);
  }

  // Save & Load
  prepareFile(): {} {
    return {
      colorScheme: this.generalService.colorScheme,
      markerColor: this.generalService.markerColor,
      bgColor: this.generalService.bgColor,
      bgImage: this.generalService.bgImage,
      cropBgImage: this.generalService.cropBgImage,
      cropStateBgImage: this.generalService.cropStateBgImage,
      banner: this.generalService.banner,
      cropBanner: this.generalService.cropBanner,
      cropStateBanner: this.generalService.cropStateBanner,
      blurBgImage: this.generalService.blurBgImage,
      dimensions: this.generalService.dimensions,
      numExtraSquares: this.generalService.numExtraSquares,
      eventTitle: this.generalService.eventTitle,
      extraTitle: this.generalService.extraTitle,
      squares: this.generalService.squares,
      extraSquares: this.generalService.extraSquares,
      separatedSquares: this.generalService.separatedSquares,
      roundBorderSquares: this.generalService.roundBorderSquares
    };
  }

  saveBingo(): void {
    const saveJSON = this.prepareFile();
    this.generalService.download((this.generalService.eventTitle !== '' && this.generalService.eventTitle != null ?
      this.generalService.eventTitle : 'bingogenerator') + '.json', JSON.stringify(saveJSON));
  }

  async loadBingo(data): Promise<void> {
    const reader = new FileReader();
    reader.readAsText(data.target.files[0], 'UTF-8');
    const wait = async () => {
      return new Promise((resolve) => {
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          }
        };
      });
    };
    data = await wait();
    data = this.validJSON(data);
    if (!data) {
      alert(this.getString('notValidJSON'));
    } else {
      await this.loadParameters(data);
    }
  }

  async loadParameters(data): Promise<void> {
    // Properly validate all the parameters. Set some defaults in case anything is wrong
    this.generalService.colorScheme = data.colorScheme === 'light' ? 'light' : 'dark';
    this.generalService.markerColor = this.isColor(data.markerColor) ? data.markerColor : '#2ca3d288';
    this.generalService.bgColor = this.isColor(data.bgColor) ? data.bgColor : '#2f3033';
    this.generalService.bgImage = await this.loadImage(data.bgImage) ? data.bgImage : '';
    this.generalService.cropBgImage = await this.loadImage(data.cropBgImage) ? data.cropBgImage : '';
    this.generalService.cropBanner = await this.loadImage(data.cropBanner) ? data.cropBanner : '';
    this.generalService.cropStateBgImage = null;
    this.generalService.cropStateBanner = null;
    this.generalService.banner = await this.loadImage(data.banner) ? data.banner : '';
    this.generalService.blurBgImage = data.blurBgImage < 0 || !this.isNumeric(data.blurBgImage) ? 0 :
      data.blurBgImage > 10 ? 10 : data.blurBgImage;
    this.generalService.dimensions[0] = data.dimensions[0] < 1 || !this.isNumeric(data.dimensions[0]) ? 5 :
      data.dimensions[0] > 10 ? 10 : data.dimensions[0];
    this.generalService.dimensions[1] = data.dimensions[1] < 1 || !this.isNumeric(data.dimensions[1]) ? 5 :
      data.dimensions[1] > 10 ? 10 : data.dimensions[1];
    this.generalService.numExtraSquares = data.numExtraSquares < 0 || !this.isNumeric(data.numExtraSquares) ? 0 :
      data.numExtraSquares > 10 ? 10 : data.numExtraSquares;
    this.generalService.eventTitle = data.eventTitle.length > 75 ? data.eventTitle.substring(0, 75) : data.eventTitle;
    this.generalService.extraTitle = data.extraTitle.length > 75 ? data.extraTitle.substring(0, 75) : data.extraTitle;
    this.generalService.initializeSquares();
    // If there are less than 100, it's fine. If there are more than 100, ignore the spare squares.
    let currentSquare;
    let currentImage;
    for (let i = 0; i < 100 && i < data.squares.length; ++i) { // Limit number of squares by 100 and JSON squares
      currentSquare = data.squares[i];
      if (currentSquare != null) {
        currentImage = await this.loadImage(currentSquare.img);
        this.generalService.squares[i].blur = currentSquare.blur;
        this.generalService.squares[i].cropImg = await this.loadImage(currentSquare.cropImg) ? currentSquare.cropImg : '';
        this.generalService.squares[i].img = currentImage != null ? currentSquare.img : '';
        this.generalService.squares[i].marked = currentSquare.marked;
        this.generalService.squares[i].name = currentSquare.name.length > 150 ? currentSquare.name.substring(0, 150) : currentSquare.name;
        this.generalService.squares[i].offsetH = currentSquare.offsetH < 0 || currentImage == null ? 0 :
          currentSquare.offsetH > (currentImage.height - 150) ? currentImage.height - 150 : currentSquare.offsetH;
        this.generalService.squares[i].offsetW = currentSquare.offsetW < 0 || currentImage == null ? 0 :
          currentSquare.offsetW > (currentImage.width - 150) ? currentImage.width - 150 : currentSquare.offsetW;
      }
    }
    for (let i = 0; i < 10 && i < data.extraSquares.length; ++i) { // Limit number of extra squares by 10 and JSON squares
      currentSquare = data.extraSquares[i];
      if (currentSquare != null) {
        currentImage = await this.loadImage(currentSquare.img);
        this.generalService.extraSquares[i].blur = currentSquare.blur;
        this.generalService.extraSquares[i].cropImg = await this.loadImage(currentSquare.cropImg) ? currentSquare.cropImg : '';
        this.generalService.extraSquares[i].img = currentImage != null ? currentSquare.img : '';
        this.generalService.extraSquares[i].marked = currentSquare.marked;
        this.generalService.extraSquares[i].name = currentSquare.name.length > 150 ? currentSquare.name.substring(0, 150) :
          currentSquare.name;
        this.generalService.extraSquares[i].offsetH = currentSquare.offsetH < 0 || currentImage == null ? 0 :
          currentSquare.offsetH > (currentImage.height - 150) ? currentImage.height - 150 : currentSquare.offsetH;
        this.generalService.extraSquares[i].offsetW = currentSquare.offsetW < 0 || currentImage == null ? 0 :
          currentSquare.offsetW > (currentImage.width - 150) ? currentImage.width - 150 : currentSquare.offsetW;
      }
    }
    this.generalService.separatedSquares = data.separatedSquares < 0 || !this.isNumeric(data.separatedSquares) ? 0 :
      data.separatedSquares > 5 ? 5 : data.separatedSquares;
    this.generalService.roundBorderSquares = data.roundBorderSquares < 0 || !this.isNumeric(data.roundBorderSquares) ? 0 :
      data.roundBorderSquares > 5 ? 5 : data.roundBorderSquares;
    this.generalService.getLines();
  }

  async loadImage(evt: any): Promise<{ width: number, height: number }> {
    return new Promise((resolve) => {
      const img = new Image();
      if (typeof evt === 'string') {
        img.src = evt;
      } else {
        resolve(null);
      }
      img.onload = () => {
        resolve({width: img.width, height: img.height});
      };
      img.onerror = () => {
        resolve(null);
      };
    });
  }

  isNumeric(n): boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  isColor(color): boolean {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
  }

  validJSON(jsonString): {} {
    try {
      const json = JSON.parse(jsonString);
      if (json && typeof json === 'object') {
        return json;
      }
    } catch (e) {
    }
    return false;
  }

  // Crop handling
  imageCropped(event: ImageCroppedEvent, banner = false): void {
    // imageCropped gets triggered several times and there's no way to avoid it, so I'm setting a timeout of 50ms.
    // Offsets won't be able to be changed in this time. I think no one is that fast...
    // I don't like to use this but I don't see any alternatives. I tried with the other outputs, but they get triggered asynchronously
    // and it's not possible to do anything with that.
    if (!this.generalService.cropTimer) {
      if (banner) {
        this.generalService.cropStateBanner = [];
        this.generalService.cropStateBanner[0] = event.cropperPosition.x1;
        this.generalService.cropStateBanner[1] = event.cropperPosition.y1;
        this.generalService.cropStateBanner[2] = event.cropperPosition.x2;
        this.generalService.cropStateBanner[3] = event.cropperPosition.y2;
        this.generalService.cropBanner = event.base64;
      } else {
        this.generalService.cropStateBgImage = [];
        this.generalService.cropStateBgImage[0] = event.cropperPosition.x1;
        this.generalService.cropStateBgImage[1] = event.cropperPosition.y1;
        this.generalService.cropStateBgImage[2] = event.cropperPosition.x2;
        this.generalService.cropStateBgImage[3] = event.cropperPosition.y2;
        this.generalService.cropBgImage = event.base64;
      }
    }
  }

  getSelectedCoordinates(): CropperPosition {
    return this.generalService.cropper;
  }

  imageLoaded(): void {
    this.generalService.cropTimer = true;
    setTimeout(() => {
      this.generalService.cropTimer = false;
    }, 1000);
  }

  cropReady(evt, banner = false): void {
    if (this.generalService.cropStateBgImage != null && !banner) {
      this.generalService.cropper = {
        x1: this.generalService.cropStateBgImage[0],
        y1: this.generalService.cropStateBgImage[1],
        x2: this.generalService.cropStateBgImage[2],
        y2: this.generalService.cropStateBgImage[3]
      };
    } else if (this.generalService.cropStateBanner != null && banner) {
      this.generalService.cropper = {
        x1: this.generalService.cropStateBanner[0],
        y1: this.generalService.cropStateBanner[1],
        x2: this.generalService.cropStateBanner[2],
        y2: this.generalService.cropStateBanner[3]
      };
    } else {
      let x;
      let y;
      if (banner) {
        x = this.generalService.dimensions[1] < 5 ? 500 : this.generalService.dimensions[1] * 100;
        y = 80;
      } else {
        const incr = this.generalService.numExtraSquares ? 80 : 0;
        const height = Math.ceil(this.generalService.numExtraSquares / Math.max(5, this.generalService.dimensions[0]));
        x = this.generalService.dimensions[1] < 5 ? 500 : this.generalService.dimensions[1] * 100;
        y = (this.generalService.dimensions[0] + height) * 100 + 80 + incr;
      }
      // Reduce x, y values to meet cropper width and height
      const reduce = evt.width / x;
      if (reduce < 1) {
        x = x * reduce;
        y = y * reduce;
      }
      const reducey = evt.height / y;
      if (reducey < 1) {
        x = x * reducey;
        y = y * reducey;
      }
      this.generalService.cropper = {
        x1: 0,
        y1: 0,
        x2: x,
        y2: y
      };
    }
  }

  bgAspectRatio(): number {
    const incr = this.generalService.numExtraSquares ? 80 : 0;
    const height = Math.ceil(this.generalService.numExtraSquares / Math.max(5, this.generalService.dimensions[0]));
    const x = this.generalService.dimensions[1] < 5 ? 500 : this.generalService.dimensions[1] * 100;
    const y = (this.generalService.dimensions[0] + height) * 100 + 80 + incr;
    return x / y;
  }

  bannerAspectRatio(): number {
    const x = this.generalService.dimensions[1] < 5 ? 500 : this.generalService.dimensions[1] * 100;
    const y = 80;
    return x / y;
  }
}
