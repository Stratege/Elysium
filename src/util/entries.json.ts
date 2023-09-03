import {entry} from "./types.ts";
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
let realEntries : {[x:string] : entry} = {
  "10,10": {
    faction:"Dragon",
    note: 'This is not dead that can eternally lie and with strange aeons, even death may die'
  },
  "5,5": {
    faction: 'Cove',
    building: 'HQ',
    owningGM: "Minioris",
    terrain: "Dungeonstone",
  },
  "5,20": {
    faction: 'Nihi',
    building: 'HQ',
    owningGM: "Stratege",
    terrain: "Dungeonstone",
  },
  "20,5": {
    faction: 'Thul',
    building: 'HQ',
    owningGM: "Darthgorloc",
    terrain: "Dungeonstone",
  },
  "5,19": {
    faction: 'Dungeon',
    owningGM: 'Stratege',
  },
  "6,19": {
    faction: 'Nihi',
    owningGM: 'Stratege',
  }
}

fix()