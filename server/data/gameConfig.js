(function() {
  var fs = require('fs');
  var description = "說明";
  let filename = "developer/agent/test/data/gameList.txt";
  // let filename = "project/agent/test/data/gameList.txt";
  //----
  var gameConfigList = JSON.parse(fs.readFileSync(filename, {encoding:'utf8'}));

  var gameConfigMap = {};
  gameConfigList.forEach(function(gameConfig){
    if(!gameConfig) {
      return;
    }
    gameConfigMap[gameConfig.id] = gameConfig;
  });

  exports.get = function(id){
    let conf = gameConfigMap[id];
    if(!conf){
      console.log(filename);
      gameConfigList = JSON.parse(fs.readFileSync(filename, {encoding:'utf8'}));
      gameConfigList.forEach(function(gameConfig){
        if(!gameConfig) {
          return;
        }
        gameConfigMap[gameConfig.id] = gameConfig;
      });
      conf = gameConfigMap[id];
    }

    return conf;
  };

  exports.description = description;
}).call(this);
