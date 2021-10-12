// ==UserScript==
// @name         URL Server Join
// @namespace    name?
// @version      1.1
// @updateURL    https://github.com/Haydz6/URLServerJoin/raw/master/Main.js
// @description  Join specific server with JobID
// @author       Haydz6
// @match        http*://*.roblox.com/games/*
// @grant        none
// @run-at        document-start
// ==/UserScript==

function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('?');
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
    let JobID = GetURLParameter("JobID");
    console.log(" placeid: "+PlaceID+" jobId: "+JobID);
    return {JobID, PlaceID}
}

function JoinPlace(JobID, PlaceID){
  console.log("JoinPlace fired with JobID: "+ JobID + "GameID: " + PlaceID)
  if (PlaceID && JobID){
      Roblox.GameLauncher.joinGameInstance(parseInt(PlaceID,10), String(JobID));
  }
}

var {JobID, PlaceID} = GrabURLEarly()
console.log(JobID + " " + PlaceID)

function PageLoaded(){
    JoinPlace(JobID, PlaceID)
}

window.onload = PageLoaded;