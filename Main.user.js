// ==UserScript==
// @name         URL Server Join
// @namespace    name?
// @version      1.7
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
    const sPageURL = window.location.search.substring(1)
    const sURLVariables = sPageURL.split('?')
    for (var i = 0; i < sURLVariables.length; i++){
        const sParameterName = sURLVariables[i].split('=')
        if (sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }
}
function GrabURLEarly(){
    const PlaceID = String(location.href.match(/\/(\d+)\//g)).match(/\d+/g)
    const JobID = GetURLParameter("JobID")
    return [JobID, PlaceID]
}

function JoinPlace(JobID, PlaceID){
  console.log("JoinPlace fired with JobID: "+ JobID + "GameID: " + PlaceID)
  Roblox.GameLauncher.joinGameInstance(parseInt(PlaceID,10), String(JobID))
}

function ClientOpened(){
    window.close()
}

const [JobID, PlaceID] = GrabURLEarly()

function PageLoaded(){
    JoinPlace(JobID, PlaceID)
    for (const property in Roblox.GameLauncher) {
        if (property.slice(0,6).toLowerCase() == "jquery"){
            Roblox.GameLauncher[property].events.startClientSucceeded["0"].handler = ClientOpened
        }
    }
}

function WaitForRoblox(){
    if (!Roblox?.GameLauncher?.joinGameInstance || !Roblox?.GameLauncher?.gameLaunchInterface?.joinGameInstance){
        setTimeout(WaitForRoblox, 100)
        return
    }
    PageLoaded()
}
WaitForRoblox()
