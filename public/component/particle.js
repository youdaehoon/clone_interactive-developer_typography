const FRICTION = 0.86;
const COLOR_SPEED = 0.12;
const MOVE_SPEED = 0.1;

export class Particle {
  constructor(pos, texture) {
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.tint = 0x000000;
    //Sprite는 이미지 또는 이미지 조각을 로드하고 화면에 표시하는 Pixi.js 객체입니다.
    this.sprite.scale.set(0.2);
    this.savedX = pos.x;
    this.savedY = pos.y;
    this.x = pos.x;
    this.y = pos.y;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.vx = 0;
    this.vy = 0;
    this.radius = 10;

    this.savedRgb = 0xf3316e;
    this.rgb = 0xf3316e;
  }

  collide() {
    this.rgb = 0x451966;
  }

  draw() {
    this.rgb += (this.savedRgb - this.rgb) * COLOR_SPEED;
    this.x += (this.savedX - this.x) * MOVE_SPEED;
    this.y += (this.savedY - this.y) * MOVE_SPEED;
    //particle의 위치 변화가 멀수록 더 빠르게

    this.vx *= FRICTION;
    this.vy *= FRICTION;
    //마찰계수
    this.x += this.vx;
    this.y += this.vy;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.tint = this.rgb;
  }
}
