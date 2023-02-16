const Croquet = require('@croquet/croquet')
const Q = Croquet.Constants;
const BallModel = require('./ball-model.js')

module.exports = class RootModel extends Croquet.Model {

    init(options) {
        super.init(options);
        this.children = [];
        for (let i = 0; i < Q.BALL_NUM; i++) {
          this.add(BallModel.create({type:'roundRect'})); 
        }
    }

    add(child) {
        this.children.push(child);
        this.publish(this.id, 'child-added', child);
   }
}