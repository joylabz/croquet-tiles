const Croquet = require('@croquet/croquet');
const Q = Croquet.Constants;
Q.BALL_NUM = 150;              // how many balls do we want?
Q.STEP_MS = 1000 / 30;        // bouncing ball tick interval in ms
Q.SPEED = 10;                 // max speed on a dimension, in units/s
const BallModel = require('./models/ball-model.js');
const RootModel = require('./models/root-model.js')
const RootView = require('./views/root-view.js')
RootModel.register("RootModel");
BallModel.register("BallModel")


const name = Croquet.App.autoSession();
const password = Croquet.App.autoPassword();

Croquet.Session.join({
  apiKey: '1z2GLmjc7DhtCearxnHKt80vDla4165tiivc6zxnf',
  appId: 'com.joylabz.will.awesome-app',
  name,
  password,
  model: RootModel,
  view: RootView
});

