export class Text {
  constructor() {
    this.canvas = document.createElement("canvas");

    this.ctx = this.canvas.getContext("2d");
  }

  setText(str, density, stageWidth, stageHeight) {
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    const myText = str;
    const fontWidth = 700;
    const fontSize = 800;
    const fontName = `Hind`;

    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    this.ctx.fillStyle = `rgba(0,0,0,0.3)`;
    this.ctx.textBaseline = "middle";
    // 수직 중앙정렬
    const fontPos = this.ctx.measureText(myText);

    const posX = (stageWidth - fontPos.width) / 2;
    const posY =
      (stageHeight - fontSize) / 2 +
      fontPos.actualBoundingBoxAscent +
      fontPos.actualBoundingBoxDescent;
    //정중앙 위치하기 위함
    //https://lts0606.tistory.com/m/297/comments

    this.ctx.fillText(myText, posX, posY);

    return this.dotPos(density, stageWidth, stageHeight);
    // particle을 text근처로 찍기 위한 위치정보
  }

  dotPos(density, stageWidth, stageHeight) {
    const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;

    const particles = [];
    let i = 0;
    let width = 0;
    let pixel;

    for (let height = 0; height < stageHeight; height += density) {
      ++i;
      const slide = i % 2 === 0;
      width = 0;
      if (slide === true) {
        width += 6;
      }

      for (width; width < stageWidth; width += density) {
        pixel = imageData[(width + height * stageWidth) * 4 - 1];
        //imageData 객체의 데이터는 1차원 배열 형태로 저장되며, 이 배열은 빨강(Red), 녹색(Green), 파랑(Blue), 알파(Alpha) 채널에 대한 값을 번갈아 저장합니다. 각 픽셀은 4개의 연속된 인덱스
        //즉 appha값이 0이아닌 pixel들을 추출

        if (
          pixel != 0 &&
          width > 0 &&
          width < stageWidth &&
          height > 0 &&
          height < stageHeight
        ) {
          particles.push({ x: width, y: height });
          //윗줄부터 차례로 particle 위치를 추출함
        }
      }
    }

    return particles;
  }
}
