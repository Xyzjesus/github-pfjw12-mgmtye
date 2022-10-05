'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
exports.CW20Base = void 0;
var encoding_1 = require('@cosmjs/encoding');
var stargate_1 = require('@cosmjs/stargate');
var tx_1 = require('cosmjs-types/cosmos/tx/v1beta1/tx');
var tx_2 = require('cosmjs-types/cosmwasm/wasm/v1/tx');
var fees_1 = require('./fees');
var jsonToBinary = function (json) {
  return (0, encoding_1.toBase64)((0, encoding_1.toUtf8)(JSON.stringify(json)));
};
var CW20Base = function (client, txSigner) {
  console.log('client', client);
  var fee = (0, fees_1.getExecuteFee)();
  var use = function (contractAddress) {
    var balance = function (address) {
      return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                client.queryContractSmart(contractAddress, {
                  balance: { address: address },
                }),
              ];
            case 1:
              result = _a.sent();
              return [2 /*return*/, result.balance];
          }
        });
      });
    };
    var allowance = function (owner, spender) {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [
            2 /*return*/,
            client.queryContractSmart(contractAddress, {
              allowance: { owner: owner, spender: spender },
            }),
          ];
        });
      });
    };
    var allAllowances = function (owner, startAfter, limit) {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [
            2 /*return*/,
            client.queryContractSmart(contractAddress, {
              all_allowances: {
                owner: owner,
                start_after: startAfter,
                limit: limit,
              },
            }),
          ];
        });
      });
    };
    var allAccounts = function (startAfter, limit) {
      return __awaiter(void 0, void 0, void 0, function () {
        var accounts;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                client.queryContractSmart(contractAddress, {
                  all_accounts: { start_after: startAfter, limit: limit },
                }),
              ];
            case 1:
              accounts = _a.sent();
              return [2 /*return*/, accounts.accounts];
          }
        });
      });
    };
    var tokenInfo = function () {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [
            2 /*return*/,
            client.queryContractSmart(contractAddress, { token_info: {} }),
          ];
        });
      });
    };
    var minter = function () {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [
            2 /*return*/,
            client.queryContractSmart(contractAddress, { minter: {} }),
          ];
        });
      });
    };
    var marketingInfo = function () {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [
            2 /*return*/,
            client.queryContractSmart(contractAddress, { marketing_info: {} }),
          ];
        });
      });
    };
    var mint = function (recipient, amount) {
      return __awaiter(void 0, void 0, void 0, function () {
        var signed, result;
        var _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [
                4 /*yield*/,
                client.sign(
                  txSigner,
                  [
                    {
                      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
                      value: tx_2.MsgExecuteContract.fromPartial({
                        sender: txSigner,
                        contract: contractAddress,
                        msg: (0, encoding_1.toUtf8)(
                          JSON.stringify({
                            mint: { recipient: recipient, amount: amount },
                          })
                        ),
                      }),
                    },
                  ],
                  fee,
                  ''
                ),
              ];
            case 1:
              signed = _b.sent();
              return [
                4 /*yield*/,
                client.broadcastTx(tx_1.TxRaw.encode(signed).finish()),
              ];
            case 2:
              result = _b.sent();
              if ((0, stargate_1.isDeliverTxFailure)(result)) {
                throw new Error(
                  [
                    'Error when broadcasting tx '
                      .concat(result.transactionHash, ' at height ')
                      .concat(result.height, '.'),
                    'Code: '
                      .concat(result.code, '; Raw log: ')
                      .concat(
                        (_a = result.rawLog) !== null && _a !== void 0 ? _a : ''
                      ),
                  ].join(' ')
                );
              }
              return [
                2 /*return*/,
                {
                  signed: signed,
                  txHash: result.transactionHash,
                },
              ];
          }
        });
      });
    };
    var transfer = function (recipient, amount) {
      return __awaiter(void 0, void 0, void 0, function () {
        var signed, result;
        var _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [
                4 /*yield*/,
                client.sign(
                  txSigner,
                  [
                    {
                      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
                      value: tx_2.MsgExecuteContract.fromPartial({
                        sender: txSigner,
                        contract: contractAddress,
                        msg: (0, encoding_1.toUtf8)(
                          JSON.stringify({
                            transfer: { recipient: recipient, amount: amount },
                          })
                        ),
                      }),
                    },
                  ],
                  fee,
                  ''
                ),
              ];
            case 1:
              signed = _b.sent();
              return [
                4 /*yield*/,
                client.broadcastTx(tx_1.TxRaw.encode(signed).finish()),
              ];
            case 2:
              result = _b.sent();
              if ((0, stargate_1.isDeliverTxFailure)(result)) {
                throw new Error(
                  [
                    'Error when broadcasting tx '
                      .concat(result.transactionHash, ' at height ')
                      .concat(result.height, '.'),
                    'Code: '
                      .concat(result.code, '; Raw log: ')
                      .concat(
                        (_a = result.rawLog) !== null && _a !== void 0 ? _a : ''
                      ),
                  ].join(' ')
                );
              }
              return [
                2 /*return*/,
                {
                  signed: signed,
                  txHash: result.transactionHash,
                },
              ];
          }
        });
      });
    };
    var burn = function (senderAddress, amount) {
      return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                client.execute(
                  senderAddress,
                  contractAddress,
                  { burn: { amount: amount } },
                  'auto'
                ),
              ];
            case 1:
              result = _a.sent();
              return [2 /*return*/, result.transactionHash];
          }
        });
      });
    };
    var increaseAllowance = function (senderAddress, spender, amount) {
      return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                client.execute(
                  senderAddress,
                  contractAddress,
                  { increase_allowance: { spender: spender, amount: amount } },
                  'auto'
                ),
              ];
            case 1:
              result = _a.sent();
              return [2 /*return*/, result.transactionHash];
          }
        });
      });
    };
    var decreaseAllowance = function (senderAddress, spender, amount) {
      return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                client.execute(
                  senderAddress,
                  contractAddress,
                  { decrease_allowance: { spender: spender, amount: amount } },
                  'auto'
                ),
              ];
            case 1:
              result = _a.sent();
              return [2 /*return*/, result.transactionHash];
          }
        });
      });
    };
    var transferFrom = function (senderAddress, owner, recipient, amount) {
      return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                client.execute(
                  senderAddress,
                  contractAddress,
                  {
                    transfer_from: {
                      owner: owner,
                      recipient: recipient,
                      amount: amount,
                    },
                  },
                  'auto'
                ),
              ];
            case 1:
              result = _a.sent();
              return [2 /*return*/, result.transactionHash];
          }
        });
      });
    };
    var send = function (senderAddress, contract, amount, msg) {
      return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                client.execute(
                  senderAddress,
                  contractAddress,
                  {
                    send: {
                      contract: contract,
                      amount: amount,
                      msg: jsonToBinary(msg),
                    },
                  },
                  'auto'
                ),
              ];
            case 1:
              result = _a.sent();
              return [2 /*return*/, result.transactionHash];
          }
        });
      });
    };
    var sendFrom = function (senderAddress, owner, contract, amount, msg) {
      return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                client.execute(
                  senderAddress,
                  contractAddress,
                  {
                    send_from: {
                      owner: owner,
                      contract: contract,
                      amount: amount,
                      msg: jsonToBinary(msg),
                    },
                  },
                  'auto'
                ),
              ];
            case 1:
              result = _a.sent();
              return [2 /*return*/, result.transactionHash];
          }
        });
      });
    };
    var burnFrom = function (senderAddress, owner, amount) {
      return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                client.execute(
                  senderAddress,
                  contractAddress,
                  { burn_from: { owner: owner, amount: amount } },
                  'auto'
                ),
              ];
            case 1:
              result = _a.sent();
              return [2 /*return*/, result.transactionHash];
          }
        });
      });
    };
    var updateMarketing = function (
      senderAddress,
      project,
      description,
      marketing
    ) {
      return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                client.execute(
                  senderAddress,
                  contractAddress,
                  {
                    update_marketing: {
                      project: project,
                      description: description,
                      marketing: marketing,
                    },
                  },
                  'auto'
                ),
              ];
            case 1:
              result = _a.sent();
              return [2 /*return*/, result.transactionHash];
          }
        });
      });
    };
    var uploadLogo = function (senderAddress, logo) {
      return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                client.execute(
                  senderAddress,
                  contractAddress,
                  { upload_logo: __assign({}, logo) },
                  'auto'
                ),
              ];
            case 1:
              result = _a.sent();
              return [2 /*return*/, result.transactionHash];
          }
        });
      });
    };
    return {
      contractAddress: contractAddress,
      balance: balance,
      allowance: allowance,
      allAllowances: allAllowances,
      allAccounts: allAccounts,
      tokenInfo: tokenInfo,
      minter: minter,
      marketingInfo: marketingInfo,
      mint: mint,
      transfer: transfer,
      burn: burn,
      increaseAllowance: increaseAllowance,
      decreaseAllowance: decreaseAllowance,
      transferFrom: transferFrom,
      send: send,
      sendFrom: sendFrom,
      burnFrom: burnFrom,
      updateMarketing: updateMarketing,
      uploadLogo: uploadLogo,
    };
  };
  var instantiate = function (senderAddress, codeId, initMsg, label, admin) {
    return __awaiter(void 0, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              client.instantiate(
                senderAddress,
                codeId,
                initMsg,
                label,
                'auto',
                {
                  memo: '',
                  admin: admin,
                }
              ),
            ];
          case 1:
            result = _a.sent();
            return [
              2 /*return*/,
              {
                contractAddress: result.contractAddress,
                transactionHash: result.transactionHash,
              },
            ];
        }
      });
    });
  };
  var messages = function () {
    var mint = function (cw20TokenAddress, recipient, amount) {
      return {
        sender: txSigner,
        contract: cw20TokenAddress,
        msg: {
          mint: { recipient: recipient, amount: amount },
        },
        funds: [],
      };
    };
    var transfer = function (cw20TokenAddress, recipient, amount) {
      return {
        sender: txSigner,
        contract: cw20TokenAddress,
        msg: {
          transfer: { recipient: recipient, amount: amount },
        },
        funds: [],
      };
    };
    var send = function (cw20TokenAddress, contract, amount, msg) {
      return {
        sender: txSigner,
        contract: cw20TokenAddress,
        msg: {
          send: { contract: contract, amount: amount, msg: msg },
        },
        funds: [],
      };
    };
    var burn = function (cw20TokenAddress, amount) {
      return {
        sender: txSigner,
        contract: cw20TokenAddress,
        msg: {
          burn: { amount: amount },
        },
        funds: [],
      };
    };
    var increaseAllowance = function (cw20TokenAddress, recipient, amount) {
      return {
        sender: txSigner,
        contract: cw20TokenAddress,
        msg: {
          increase_allowance: { recipient: recipient, amount: amount },
        },
        funds: [],
      };
    };
    var decreaseAllowance = function (cw20TokenAddress, recipient, amount) {
      return {
        sender: txSigner,
        contract: cw20TokenAddress,
        msg: {
          decrease_allowance: { recipient: recipient, amount: amount },
        },
        funds: [],
      };
    };
    var transferFrom = function (cw20TokenAddress, owner, recipient, amount) {
      return {
        sender: txSigner,
        contract: cw20TokenAddress,
        msg: {
          transfer_from: { owner: owner, recipient: recipient, amount: amount },
        },
        funds: [],
      };
    };
    var sendFrom = function (cw20TokenAddress, owner, contract, amount, msg) {
      return {
        sender: txSigner,
        contract: cw20TokenAddress,
        msg: {
          send_from: {
            owner: owner,
            contract: contract,
            amount: amount,
            msg: msg,
          },
        },
        funds: [],
      };
    };
    var burnFrom = function (cw20TokenAddress, owner, amount) {
      return {
        sender: txSigner,
        contract: cw20TokenAddress,
        msg: {
          burn_from: { owner: owner, amount: amount },
        },
        funds: [],
      };
    };
    var updateMarketing = function (
      cw20TokenAddress,
      project,
      description,
      marketing
    ) {
      return {
        sender: txSigner,
        contract: cw20TokenAddress,
        msg: {
          update_marketing: {
            project: project,
            description: description,
            marketing: marketing,
          },
        },
        funds: [],
      };
    };
    var uploadLogo = function (cw20TokenAddress, url) {
      return {
        sender: txSigner,
        contract: cw20TokenAddress,
        msg: {
          upload_logo: { logo: { url: url } },
        },
        funds: [],
      };
    };
    return {
      mint: mint,
      transfer: transfer,
      send: send,
      burn: burn,
      increaseAllowance: increaseAllowance,
      decreaseAllowance: decreaseAllowance,
      transferFrom: transferFrom,
      sendFrom: sendFrom,
      burnFrom: burnFrom,
      updateMarketing: updateMarketing,
      uploadLogo: uploadLogo,
    };
  };
  return { instantiate: instantiate, use: use, messages: messages };
};
exports.CW20Base = CW20Base;
