# kinetic typography

## 목적

clone하며 canvas element와 webgl api에 대하여 공부한다.

## skill

![express](https://img.shields.io/badge/Express-ffffff?style=for-the-badge&logo=express&logoColor=green)
![React](https://img.shields.io/badge/Javascript-444444?style=for-the-badge&logo=javascript)
![React](https://img.shields.io/badge/Pixi.js-e91e63?style=for-the-badge&)

## How to Clone

1. clone
2. `npm install`
3. `node app.js`

## 공부기록

### 어떻게 particle로 만드는가?

```
const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;

```

에서 얻어지는 uni8array는 순서대로 rgba값을 저장하는 1차원 array이다.
그 중 alpha값이 0이 아닌 부분은 해당 px이 색이 있다는 것을 의미하므로 추출할 수 있다.

```
pixel = imageData[(width + height * stageWidth) * 4 - 1];
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
```
