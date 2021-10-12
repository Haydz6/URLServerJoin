// ==UserScript==
// @name         URL Server Join
// @namespace    name?
// @version      1.0
// @updateURL    https://github.com/mawesome4ever/GameLauncherTamperMonkey/raw/master/Join.user.js
// @description  Join specific server with JobID
// @author       Haydz6
// @match        http*://*.roblox.com/games/*
// @grant        none
// @run-at        document-start
// ==/UserScript==

function GetURLParameter(sParam){
    console.log(window.location.href)
    console.log(sParam)
    var sPageURL = window.location.search.substring(1);
    console.log(sPageURL)
    var sURLVariables = sPageURL.split('?');
    console.log(sURLVariables)
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
            console.log(sParameterName)
            return sParameterName[1];
        }
    }
}
function GrabURLEarly(){
    var PlaceID = location.href.match(/\/(\d+)\//g);
    PlaceID = String(PlaceID).match(/\d+/g);
    let gameid = GetURLParameter("gameid");
    console.log(" placeid: "+PlaceID+" gameid: "+gameid);
    return gameid & PlaceID
}

function JoinPlace(JobID, GameID){
  if (GameID && JobID){
      Roblox.GameLauncher.joinGameInstance(parseInt(GameID,10), String(JobID));
  }
}

var JobID, GameID = GrabURLEarly()
document.body.onload = JoinPlace(JobID, GameID);
