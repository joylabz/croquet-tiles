const Croquet = require('@croquet/croquet')
const BallView = require('./ball-view.js')
//------------ View--------------
window.SCALE = 1;                  // model uses a virtual 1000x1000 space
let OFFSETX = 50;               // top-left corner of view, plus half shape width
let OFFSETY = 50;               // top-left corner of view, plus half shape height


module.exports = class RootView extends Croquet.View{

    constructor(model) {
        super(model);

        this.element = document.getElementById('drawing-area');
        this.resize();
        window.onresize = () => this.resize();
        model.children.forEach(child => this.attachChild(child));
    }

    attachChild(child) {
        this.element.appendChild(new BallView(child).element);
    }

    resize() {
        const size = Math.max(50, Math.min(window.innerWidth, window.innerHeight));
        SCALE = size / 1100;
        OFFSETX = (window.innerWidth - size) / 2;
        OFFSETY = 0;
        this.element.style.transform = `translate(${OFFSETX}px,${OFFSETY}px) scale(${SCALE})`;
        this.element.style.transformOrigin = "0 0";
        OFFSETX += 50 * SCALE;
        OFFSETY += 50 * SCALE;
    }
  
    detach() {
        super.detach();
        let child;
        while (child = this.element.firstChild) this.element.removeChild(child);
    }
}