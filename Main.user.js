// ==UserScript==
// @name         URL Server Join
// @namespace    name?
// @version      1.6
// @updateURL    https://github.com/Haydz6/URLServerJoin/raw/main/Main.js
// @homepage     https://github.com/Haydz6/URLServerJoin
// @downloadURL  https://github.com/Haydz6/URLServerJoin/raw/main/Main.js
// @description  Join specific server with JobID
// @author       Haydz6
// @match        http*://*.roblox.com/games/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1)
    var sURLVariables = sPageURL.split('?')
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=')
        if (sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }
}
function GrabURLEarly(){
    var PlaceID = location.href.match(/\/(\d+)\//g)
    PlaceID = String(PlaceID).match(/\d+/g)
    let JobID = GetURLParameter("JobID")
    return {JobID, PlaceID}
}

function JoinPlace(JobID, PlaceID){
  console.log("JoinPlace fired with JobID: "+ JobID + "GameID: " + PlaceID)
  Roblox.GameLauncher.joinGameInstance(parseInt(PlaceID,10), String(JobID))
}

function ClientOpened(){
    window.close()
}

var {JobID, PlaceID} = GrabURLEarly()

function PageLoaded(){
    JoinPlace(JobID, PlaceID)
    for (const property in Roblox.GameLauncher) {
        if (property.slice(0,6).toLowerCase() == "jquery"){
            Roblox.GameLauncher[property].events.startClientSucceeded["0"].handler = ClientOpened
        }
    }
}

if (JobID && PlaceID){window.onload = PageLoaded}
