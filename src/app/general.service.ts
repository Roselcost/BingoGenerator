import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import domtoimage from 'dom-to-image';
import Compressor from 'compressorjs';
import strings from '../assets/strings';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  // Strings
  strings = strings.strings;
  // Bingo options
  language = 'en'; // en, es, ca, fr, de, it, jp
  theme = 'dark'; // dark, light
  // Bingo config
  colorScheme = 'dark';
  markerColor = '#2ca3d288';
  bgColor = '#2f3033';
  bgImage = '';
  cropBgImage = '';
  cropBanner = '';
  cropStateBgImage = null;
  cropStateBanner = null;
  blurBgImage = 0;
  banner = '';
  dimensions: number[] = [5, 5];
  numExtraSquares = 0;
  eventTitle = '';
  extraTitle = '';
  squares: {name: string, img: string, cropImg: string, offsetH: number, offsetW: number, marked: boolean, blur: boolean}[] = [];
  extraSquares: {name: string, img: string, cropImg: string, offsetH: number, offsetW: number, marked: boolean, blur: boolean}[] = [];
  numberLines = 0;
  separatedSquares = 0;
  roundBorderSquares = 0;
  // Subjects
  modalResponse = new Subject();
  uploadMultipleImages = new Subject();
  // Cropper
  cropTimer = false;
  cropper = {
    x1: 0,
    y1: 0,
    x2: 150,
    y2: 150
  };

  constructor() {

  }
  // Useful functions
  initializeSquares(): void{
    // Initialize both normal and extra squares to default values
    for (let i = 0; i < 100; ++i) {
      this.squares[i] = {
        name: '',
        img: '',
        cropImg: '',
        offsetH: 0,
        offsetW: 0,
        marked: false,
        blur: false
      };
    }
    for (let i = 0; i < 10; ++i) {
      this.extraSquares[i] = {
        name: '',
        img: '',
        cropImg: '',
        offsetH: 0,
        offsetW: 0,
        marked: false,
        blur: false
      };
    }
  }
  getString(str): string{
    const ret = this.strings[this.language] == null ? '' : this.strings[this.language][str];
    return ret == null ? '' : ret;
  }
  // Image functions
  async compressAndFiletoImage(file): Promise<{error: boolean, value: string}>{
    const fileType = file.type;
    if (!['image/gif', 'image/jpeg', 'image/png'].includes(fileType)) {
      alert(this.getString('alertNotImage'));
      return {error: true, value: 'Not an image'};
    }
    else{
      if (fileType !== 'image/gif') {
        file = await this.doCompress(file);
      }
      file = await this.fileToImage(file);
      return {
        error: false,
        value: file
      };
    }
  }
  async fileToImage(evento): Promise<string> {
    // Transforms from blob to ImageBase64 string
      return new Promise((resolve, reject) => {
        if (evento == null || evento === ''){
          resolve('');
        }
        const reader = new FileReader();
        reader.readAsDataURL(evento);
        reader.onload = (e) => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          }
        };
      });
  }
  async doCompress(evt: File, compDims: [number, number] = [150, 150]): Promise<Blob> {
    const orientation = await this.getImageOrientation(evt);
    let maxW = compDims[0];
    let maxH = Infinity;
    if (orientation === 'horizontal') {
      maxW = Infinity;
      maxH = compDims[1];
    }
    return new Promise((resolve, reject) => {
      const useless = new Compressor(evt, {
        quality: 1,
        maxWidth: maxW,
        maxHeight: maxH,
        width: maxW,
        height: maxH,
        success(result): void {
          resolve(result);
        },
        error(err): void {
          console.log(err.message);
        },
      });
    });
  }

  async getImageOrientation(evt: File): Promise<string> {
    let reader = new FileReader();
    reader.readAsDataURL(evt);
    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const img = new Image();
        if (typeof reader.result === 'string') {
          img.src = reader.result;
        }
        img.onload = () => {
          let orientation = 'vertical';
          if (img.width > img.height) {
            orientation = 'horizontal';
          }
          reader = null;
          resolve(orientation);
        };
      };
    });
  }
  // Bingo lines algorithms
  getOptLines(index, marked): void {
    const row = Math.floor(index / this.dimensions[1]);
    const col = index % this.dimensions[1];
    let markedSquares = 0;
    let ind;
    for (let i = 0; i < 2; ++i) {
      markedSquares = 0;
      for (let j = 0; j < this.dimensions[i]; ++j) {
        ind = i === 0 ? j * this.dimensions[1] + col : j + this.dimensions[i] * row;
        if (this.squares[ind].marked) {
          ++markedSquares;
        }
      }
      if (marked && markedSquares === this.dimensions[i]) {
        ++this.numberLines;
      }
      if (!marked && markedSquares === this.dimensions[i] - 1) {
        --this.numberLines;
      }
    }
  }

  getLines(): void {
    let lines = 0;
    let isLine = true;
    let rev;
    let index;
    for (let k = 0; k < 2; ++k){
      rev = k === 0 ? 1 : 0;
      for (let i = 0; i < this.dimensions[k]; ++i) {
        isLine = true;
        for (let j = 0; j < this.dimensions[rev]; ++j) {
          index = k === 0 ? j + this.dimensions[1] * i : i + this.dimensions[1] * j;
          if (!this.squares[index].marked) {
            isLine = false;
          }
        }
        if (isLine) {
          ++lines;
        }
      }
    }
    this.numberLines = lines;
  }
  // Generate bingo image
  generateImageFromDOM(elem): Promise<string> {
    return domtoimage.toPng(elem);
  }

  download(filename, text): void {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  // Modal handler
  getModal(): Promise<string> {
    const body = document.getElementsByTagName('body')[0];
    body.style.marginRight = (window.innerWidth - document.documentElement.clientWidth) + 'px';
    body.style.overflow = 'hidden';
    return new Promise(((resolve, reject) => {
      this.modalResponse.subscribe((response) => {
        body.style.marginRight = '';
        body.style.overflow = '';
        if (response === 'ok') {
          resolve(response);
        } else {
          reject();
        }
      });
    }));
  }
}
