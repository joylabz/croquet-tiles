const Croquet = require('@croquet/croquet')
const Q = Croquet.Constants;
module.exports = class BallModel extends Croquet.Model {
    init(options = {}) {
        super.init();
        const r = max => Math.floor(max * this.random()); // return a random integer below max
        this.type = options.type || 'circle';
        this.color = options.color || `hsla(${r(360)},${r(50) + 50}%,50%,0.5)`;
        this.pos = options.pos || [r(1000), r(1000)];
        this.subscribe(this.id, 'drag-me', this.getDragged);
    }
   
    getDragged(data) { 
        this.pos = [1100*data.x, 1100*data.y]
        this.publish(this.id, 'pos-changed', this.pos);
    }

}
