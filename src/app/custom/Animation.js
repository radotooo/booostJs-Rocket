import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';

export default class Animation {
  constructor(_rocketElement, _backgroundElement, _svgPath) {
    this._rocketElement = _rocketElement;
    this._backgroundElement = _backgroundElement;
    this._svgPath = _svgPath;
    this._rocketTween = null;
    this.toggle = true;
  }

  async animate() {
    gsap.registerPlugin(MotionPathPlugin);
    this._rocketTween = gsap.to(this._rocketElement, {
      motionPath: {
        path: this._svgPath,
        autoRotate: true,
      },
      transformOrigin: '50% 50%',
      duration: 6,
      ease: 'power1.inOut',
    });
    await this._rocketTween;
  }
  eventHandler(condition) {
    if (condition) {
      this._rocketTween.kill();
      this._rocketTween = null;
    } else {
      this.animate();
    }
    this.toggle = !this.toggle;
  }

  start() {
    this._backgroundElement.addEventListener('click', () => {
      this.eventHandler(this.toggle);
    });
    this.animate();
  }
}
