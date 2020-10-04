import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  imgUrl: string;
  private ctx: CanvasRenderingContext2D;
  private tarctx: CanvasRenderingContext2D;

  @ViewChild('myCanvas') canva;
  @ViewChild('tarCanvas') tarCanva;
  @ViewChild('refImg') refImg;

  constructor() { }

  ngOnInit(): void {
    this.imgUrl = "../../assets/images/my_cartoon.png";
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

    this.ctx.drawImage(this.refImg.nativeElement, 0, 0, 700, 700)
    let imgData = this.ctx.getImageData(0, 0, 700, 700);
    let data = imgData.data;
    console.log(data);
    
    let pixelRgb = [];

    for(let i=0; i<data.length; i+=4){
      pixelRgb.push([data[i], data[i+1], data[i+2]]);
    }

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
      "0-0-0": 4000,
      "255-190-166": 10,
      "255-153-131": 300,
      "180-73-41": 1000,
      "194-88-74": 500,
      "77-10-1": 500,
      "255-255-255":0,
    };


    for(let i=0; i<pixelRgb.length; i++){
      let tempPos = [i%700, Math.floor(i/700)];
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

      groupColor[selKey].push(tempPos)
    }

    console.log(groupColor);

    this.tarctx = this.tarCanva.nativeElement.getContext("2d");
    // this.tarctx.beginPath();
    // this.tarctx.arc(100, 100, 10, 0, 2*Math.PI);
    // this.tarctx.fillStyle = "#FF0000";
    // this.tarctx.fill();


    for(let rgbKey in groupColor){
      let sp = rgbKey.split("-");
      //console.log(parseInt(sp[0])+" " +parseInt(sp[1]),);
      let density = 1-(parseInt(sp[0])+parseInt(sp[1])+parseInt(sp[2]))/765;
      console.log(parseInt(sp[0]) + " " + parseInt(sp[1]) + " " + parseInt(sp[2])+ " "  + density + (parseInt(sp[0])+parseInt(sp[1])+parseInt(sp[2])));
      let numberToSelect = density*groupColor[rgbKey].length;
      

      for(let i=0; i<numToSel[rgbKey] && numberToSelect!=0; i++){
          let index = Math.floor(Math.random()*(groupColor[rgbKey].length-1));
          //console.log(index);
          this.tarctx.beginPath();
          this.tarctx.arc(groupColor[rgbKey][index][0], groupColor[rgbKey][index][1], 0.5, 0, 2*Math.PI);
          this.tarctx.fillStyle = "#FF0000";
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
