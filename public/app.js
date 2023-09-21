import { Text } from "./component/text.js";
import { Visual } from "./component/visual.js";

class App {
  constructor() {
    this.setWebgle();

    WebFont.load({
      google: {
        families: [`Hind:700`],
      },
      fontactive: () => {
        //For fonts loaded from supported providers, the fontactive event will be triggered.
        //https://github.com/typekit/webfontloader
        this.visual = new Visual();
        window.addEventListener("resize", this.resize.bind(this), false);
        //.bind(this)는 resize에서의 this의 context가 class instance가 되도록 하는 method
        this.resize();
        requestAnimationFrame(this.animate.bind(this));
      },
    });
  }

  setWebgle() {
    this.renderer = new PIXI.Renderer({
      width: document.body.clientWidth,
      height: document.body.clientHeight,

      resolution: window.devicePixelRatio > 1 ? 2 : 1,
      autoDensity: true,
      powerPreFerence: "high-performance",
      backgroundColor: 0xffffff,
    });
    document.body.appendChild(this.renderer.view);
    //애플리케이션 초기화 시 선택한 Renderer를 사용하여 그래픽 요소를 화면에 렌더링합니다.

    this.stage = new PIXI.Container();
    //Container는 다른 Pixi.js 디스플레이 객체를 포함하는 컨테이너 역할을 합니다.

    const blurFilter = new PIXI.filters.BlurFilter();
    blurFilter.blur = 10;
    blurFilter.autoFit = true;
    const fragSource = `
    precision mediump float;
    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform float threshold;
    uniform float mr;
    uniform float mg;
    uniform float mb;
    void main(void) {
      vec4 color = texture2D(uSampler, vTextureCoord);
      vec3 mcolor = vec3(mr, mg, mb);
      if (color.a > threshold) {
        gl_FragColor = vec4(mcolor, 1.0);
      } else {
        gl_FragColor = vec4(vec3(0.0), 0.0);
      }
    }
  `;
    //임계값(threshold)과 비교하여 높은 픽셀을 강조하거나 낮은 픽셀을 제거하는 데 사용됩니다. 이를 통해 이미지에서 원하는 객체나 특징을 강조하거나 배경을 제거하는 데 도움이 됩니다

    const uniformsData = {
      threshold: 0.5,
      mr: 244.0 / 255.0,
      mg: 193.0 / 255.0,
      mb: 41.0 / 255.0,
    };

    const thresholdFilter = new PIXI.Filter(null, fragSource, uniformsData);
    this.stage.filters = [blurFilter, thresholdFilter];
    //blur+임계치 필터를 통해 물감과 같은 효과 구현
    this.stage.filterArea = this.renderer.screen;
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.renderer.resize(this.stageWidth, this.stageHeight);
    this.visual.show(this.stageWidth, this.stageHeight, this.stage);
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));
    this.visual.animate();

    this.renderer.render(this.stage);
  }
}

window.onload = () => {
  new App();
};
