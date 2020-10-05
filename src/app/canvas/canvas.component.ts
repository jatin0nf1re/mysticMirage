import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  imgUrl: string;
  imgHeight: number;
  imgWidth: number;
  private ctx: CanvasRenderingContext2D;
  private tarctx: CanvasRenderingContext2D;

  @ViewChild('myCanvas') canva;
  @ViewChild('tarCanvas') tarCanva;
  @ViewChild('refImg') refImg;

  constructor() { }

  ngOnInit(): void {
    this.imgUrl = "../../assets/images/hand.png";
  }

  ngAfterViewInit(): void {
    this.refImg.nativeElement.src= this.imgUrl;
    this.refImg.nativeElement.crossOrigin = "Anonymous";
    //onLoad
    setTimeout(() => {
      this.getData();
    }, 3000);

  }



  getData(){
    //console.log(this.canva);
    this.ctx = this.canva.nativeElement.getContext("2d");
    this.imgHeight = this.refImg.nativeElement.height;
    this.imgWidth = this.refImg.nativeElement.width;
    console.log(this.ctx);
    this.ctx.drawImage(this.refImg.nativeElement, 0, 0, this.imgWidth, this.imgHeight);
    let imgData = this.ctx.getImageData(0, 0, this.imgWidth, this.imgHeight);
    let data = imgData.data;
    console.log(data);
    let pixelRgb = [];

    for(let i=0; i<data.length; i+=4){
      pixelRgb.push([data[i], data[i+1], data[i+2]]);
    }
    console.log(pixelRgb);

    let groupColor = {
      "0-0-0": [],
      "255-190-166": [],
      "255-153-131": [],
      "180-73-41": [],
      "194-88-74": [],
      "77-10-1": [],
      "255-255-255":[],
    };

    let numToSel = {
      "0-0-0": "#000",
      "255-190-166": "#9b9b9b",
      "255-153-131": "#777",
      "180-73-41": "#1a1a1a",
      "194-88-74": "#404040",
      "77-10-1": "#404040",
      "255-255-255":"#ffffff",
    };


    for(let i=0; i<pixelRgb.length; i++){
      let x = i%this.refImg.nativeElement.width;
      let y = Math.floor(i/this.refImg.nativeElement.width)
      let tempPos = [x, y];
      //let tempKey = this.rgbToKey(pixelRgb[i]);
      // if(!(tempKey in groupColor)){
      //   groupColor[tempKey] = [];
      // }
      //groupColor[tempKey].push(tempPos);
      let minD = 255*255*3;
      let selKey;
      for(let key in groupColor){
        let sp = key.split("-");
        let r=parseInt(sp[0]), g=parseInt(sp[1]), b=parseInt(sp[2]);
        let tempDist = (r-pixelRgb[i][0])*(r-pixelRgb[i][0]) + (g-pixelRgb[i][1])*(g-pixelRgb[i][1]) + (b-pixelRgb[i][2])*(r-pixelRgb[i][2]);
        if(minD>tempDist){
            selKey = key;
            minD = tempDist;
        }
      }

      groupColor[selKey].push(tempPos);
    }

    console.log(groupColor);
    //this.tarCanva.nativeElement.height = this.refImg.nativeElement.height;
    //this.tarCanva.nativeElement.width = this.refImg.nativeElement.width;
    this.tarctx = this.tarCanva.nativeElement.getContext("2d");
    // this.tarctx.beginPath();
    // this.tarctx.arc(100, 100, 10, 0, 2*Math.PI);
    // this.tarctx.fillStyle = "#FF0000";
    // this.tarctx.fill();


    for(let rgbKey in groupColor){
      let sp = rgbKey.split("-");
      //console.log(parseInt(sp[0])+" " +parseInt(sp[1]),);
      let density = 0.1;
      console.log(parseInt(sp[0]) + " " + parseInt(sp[1]) + " " + parseInt(sp[2])+ " "  + density + (parseInt(sp[0])+parseInt(sp[1])+parseInt(sp[2])));
      let numberToSelect = density*groupColor[rgbKey].length;
      

      for(let i=0; i<numberToSelect; i++){
          let index = Math.floor(Math.random()*(groupColor[rgbKey].length-1));
          //console.log(index);
          this.tarctx.beginPath();
          this.tarctx.arc(groupColor[rgbKey][index][0], groupColor[rgbKey][index][1], 0.5, 0, 2*Math.PI);
          this.tarctx.fillStyle = numToSel[rgbKey];
          this.tarctx.fill();
      }
    }

    // for(let i=0; i<10; i++){
    //   if(Math.random()>=0.5){
    //     this.tarctx.beginPath();
    //     this.tarctx.arc(5.1*i, 5.1*i, 2, 0, 2*Math.PI);
    //     this.tarctx.fillStyle = "#FF0000";
    //     this.tarctx.fill();
    //   }
    // }

    // this.tarctx.beginPath();
    // this.tarctx.arc(200, 200, 10, 0, 2*Math.PI);
    // this.tarctx.fillStyle = "#FF0000";
    // this.tarctx.fill();

    console.log("Inside");

  }

  rgbToKey(rgb: any[]): string{
      let key = rgb[0]+"-"+rgb[1]+"-"+rgb[2]
      return key;
  }


}
