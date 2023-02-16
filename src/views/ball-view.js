const Croquet = require('@croquet/croquet')
module.exports = class BallView extends Croquet.View {

  constructor(model) {
    super(model);
    const el = this.element = document.createElement("div");
    el.view = this;
    el.className = model.type;
    el.id = model.id;
    el.style.backgroundColor = model.color;
    this.draw(model.pos);
    this.enableDrag();
    this.subscribe(model.id, { event: 'pos-changed', handling: "oncePerFrame" }, this.draw);
  }

  draw(pos) {
    this.element.style.left = pos[0] + "px";
    this.element.style.top = pos[1] + "px";
  }





  pickUp(e) {
    const offset = {
      x: e.clientX - e.target.getBoundingClientRect().x,
      y: e.clientY - e.target.getBoundingClientRect().y
    }
    function drop() {
      document.removeEventListener('mouseup', drop)
      document.removeEventListener('mousemove', drag)
    }
    function drag(e) {
      const el = this.element;
      const myBounds = document.querySelector('#drawing-area').getBoundingClientRect()
      const x = (e.clientX - myBounds.left - offset.x)
      const y = (e.clientY - myBounds.top - offset.y)
      const positionNormalized = {
        x: x / myBounds.width,
        y: y / myBounds.height
      }
      this.publish(el.id, 'drag-me', positionNormalized);
    }
    drop = drop.bind(this)
    drag = drag.bind(this)
    document.addEventListener('mouseup', drop)
    document.addEventListener('mousemove', drag)
  }

  enableDrag() {
    const el = this.element;
    el.onmousedown = this.pickUp.bind(this)
  }
}