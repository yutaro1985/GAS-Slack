function getChannelListToSheet(){
  var prop = PropertiesService.getScriptProperties().getProperties();

  //slackApp インスタンスの取得
  var slackApp = SlackApp.create(prop.token);
  
  var channellist = slackApp.channelsList();
  Logger.log(channellist);
  
  var range= SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(1, 1);
  // スプレッドシートをクリア
  range.offset(0, 0, 11, 2).clear();
  
  // スプレッドシート（ヘッダ）への書き込み
  var titles = ["チャンネル名", "チャンネルの目的"];
  for(var i=0; i<titles.length; i++) {
    range.offset(0, i).setValue(titles[i]);
  }

    // スプレッドシート（データ）への書き込み
  for(var i=0; i<channellist.channels.length; i++) {
    var channels = channellist.channels[i];
    
    // チャンネル名
    range.offset(i+1, 0).setValue(channels.name);
    
    // 目的
    range.offset(i+1, 1).setValue(channels.purpose.value);
  }
  
}
