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
