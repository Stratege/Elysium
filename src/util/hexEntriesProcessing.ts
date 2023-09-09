import {entry} from "./types";
import {realEntries} from "../assets/hexData";
/*
function dist(a : {x:number, y:number},b : {x:number, y:number}) : number {
  return Math.max(Math.abs(a.x-b.x),
    Math.abs(a.y-b.y))
}
function fakeElemCalc(x: number, y: number): entry {
  let d = {x, y}
  if (dist({x: 5, y: 5}, d) <= 2) {
    return {
      faction: 'Cove',
    }
  }
  if (dist({x: 5, y: 20}, d) <= 2) {
    return {
      faction: 'Nihi',
    }
  }
  if (dist({x: 20, y: 5}, d) <= 2) {
    return {
      faction: 'Thul',
    }
  }
  return {
    faction: 'Dungeon',
  }
}
*/
let len = 11
export let entries: {[x : number] : {[y : number] : entry}} = {}
function fix() {
  for (let y = 0; y < 2 * len; ++y) {
    for (let x = 0; x < 2 * len; ++x) {
      if (entries[x] == undefined) {
        entries[x] = {}
      }
      let e = realEntries[x + "," + y]
      entries[x][y] = e ?? { faction: 'Dungeon' } //fakeElemCalc(x, y)
    }
  }
}

fix()