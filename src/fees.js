'use strict';
exports.__esModule = true;
exports.getExecuteFee = void 0;
var stargate_1 = require('@cosmjs/stargate');
var getExecuteFee = function () {
  return {
    amount: (0, stargate_1.coins)(500000, 'boot'),
    gas: '1000000',
  };
};
exports.getExecuteFee = getExecuteFee;
