import * as message from 'src/slot/demo';

let logger = null;
let CustomFormat = null;
function init(config) {
  logger = config.logger;
  CustomFormat = config.CustomFormat;
}

function decode(packet) {
  let obj = null;
  let Game = message.Game;
  if(packet.format === CustomFormat.PROTOBUF) {
    let check = Game.CheckAction.decode(packet.data);
    if(check.actionType === Game.ActionType.BET) {
      let value = Game.BetRequest.decode(packet.data);
      obj = Game.BetRequest.toObject(value, {
        defaults: true,
        arrays: false,
        objects: false,
        oneofs: false
      });
    }
  }

  logger.info('輸入');
  console.log(obj);
  return obj;
}

/**
 * 產生結果
 * @param input 輸入資訊
 */
function generate(input) {
  let packet = {};
  let Game = message.Game;

  let obj = decode(input);

  try {
    // 遊戲結果
    let data = {
      actionType: Game.ActionType.RESULT,
      bet: obj.bet,
      score: message.randInt(100, 500000),
      state: 'win'
    };
    logger.info('遊戲結果');
    console.log(data);

    let Response = Game.ResultResponse;
    let value = Response.create(data);
    let buf = Response.encode(value).finish();

    // 設定 data 欄位格式
    packet.format = CustomFormat.PROTOBUF;
    packet.data = buf;
  } catch (err) {
    console.error(err);
  }

  try {
    // JP 資訊
    let Command = Game.Jackpot;
    let data = {
      actionType: Command.ActionType.NORMAL,
      mJpOutIdx: message.randInt(100, 3000),
      mJpOutValue: message.randInt(200, 800),
      mJpValue: [15652692963,2294455271,83607676,13329065,5014439,1430232,1797476],
      resultCode: 0
    };
    logger.info('JP 資訊');
    console.log(data);

    let Response = Command.BaseResponse;
    let value = Response.create(data);
    let buf = Response.encode(value).finish();

    // 設定 data 欄位格式
    packet.jackpot = {
      format: CustomFormat.PROTOBUF,
      data: buf
    };
  } catch (err) {
    console.error(err);
  }
  
  return packet;
}

export default {
  init,
  generate
}
