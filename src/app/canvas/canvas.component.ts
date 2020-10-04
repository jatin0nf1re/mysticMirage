import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  imgUrl: string;
  private ctx: CanvasRenderingContext2D;

  @ViewChild('myCanvas') canva;
  @ViewChild('refImg') refImg;

  constructor() { }

  ngOnInit(): void {
    this.imgUrl = "https://images.unsplash.com/photo-1601701119495-d6e39b664001?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
  }

  ngAfterViewInit(): void {

    console.log(this.canva.nativeElement);
    this.ctx = this.canva.nativeElement.getContext("2d");
    this.refImg.nativeElement.src= this.imgUrl;
    this.refImg.nativeElement.crossOrigin = "Anonymous";
    //onLoad
    setTimeout(() => {
      this.getData();
    }, 3000);

  }

  getData(){

    this.ctx.drawImage(this.refImg.nativeElement, 10, 10, 200, 200)
    let imgData = this.ctx.getImageData(10, 10, 200, 200);
    let data = imgData.data;
    //console.log(imgData);
    
    let pixelData = [];

    for(let i=0; i<data.length; i+=3){
      pixelData.push([data[i], data[i+1], data[i+2]]);
    }
    console.log(pixelData);

  }


}
