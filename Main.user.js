// ==UserScript==
// @name         URL Server Join
// @namespace    name?
// @version      1.9
// @updateURL    https://github.com/Haydz6/URLServerJoin/raw/main/Main.js
// @homepage     https://github.com/Haydz6/URLServerJoin
// @downloadURL  https://github.com/Haydz6/URLServerJoin/raw/main/Main.js
// @description  Join specific server with JobID
// @author       Haydz6
// @match        http*://*.roblox.com/games/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

function GetURLParameter(ParamName){
    const AllParameters = window.location.search.split("?")[1]
    const Parameters = AllParameters && AllParameters.split("&")
    if (!Parameters) return

    for (let i = 0; i < Parameters.length; i++){
        const [Name, Value] = Parameters[i].split("=")
        if (Name == ParamName){
            return Value
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
console.log(JobID)
console.log(PlaceID)
if (!JobID || !PlaceID) return

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
