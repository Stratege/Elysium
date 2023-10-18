import type {entry} from "../util/types";

export const realEntries : {[x:string] : entry} = {
  "10,10": {
    faction: "Dragon",
    note: '???'
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
    faction: 'Nihi',
    owningGM: 'Stratege',
    terrain: 'Dungeonstone',
    building: 'Forge',
    note: "active monoltih still around",
  },
  "5,18": {
    faction: 'Dungeon',
    owningGM: 'Stratege',
    note: 'Lich Lord Zargothrax encased in Crystal; Other GMs feel free to use this hex after asking',
  },
  "6,5": {
    faction: 'Cove',
    owningGM: 'Minioris',
    terrain: 'Plentiful Dead',
    building: 'Chapel',
  },
  "6,18": {
    faction: 'Nihi',
    owningGM: 'Stratege',
    terrain: 'Plentiful Metal',
    building: 'Lab',
  },
  "7,5": {
    faction: 'Dungeon',
    owningGM: 'Minioris',
  },
  "7,4": {
    faction: 'Dungeon',
    owningGM: 'Minioris',
  },
  "6,6": {
    faction: 'Cove',
    owningGM: 'Stratege',
    terrain: 'Dungeonstone',
    note: 'Dragonspawn here. Available for anyone to run, but please ask'
  },
  "6,20": {
    faction: 'Dungeon',
    owningGM: 'Helian',
    note: 'Entrance of Possession\'s Domain',
  },
  "7,19": {
    faction: 'Dungeon',
    owningGM: 'Helian',
  },
  "7,20": {
    faction: 'Dungeon',
    owningGM: 'Helian',
    note: 'Tower of Descent, Floor -1\n',
  },
  "19,5": {
    faction: 'Thul',
    owningGM: 'Darthgorloc',
    terrain: 'Fertile Soil',
    note: "corrupted altar there, tangle is holding back the corruption"
  },
  "18,6": {
    faction: 'Dungeon',
    owningGM: 'Darthgorloc',
    note: "cave of the endless, other GMs can take it, just ask"
  },
  "4,20": {
    faction: 'Nihi',
    owningGM: 'Stratege',
    terrain: 'Cryochambers',
    building: 'AC',
    note: 'The Dragon infests a mechanism here...'
  },
  "11,10": {
    faction: 'Dragon',
    note: 'Barashk gaining The Dragon\'s Embrace',
  },
  "10,9": {
    faction: 'Dragon',
    note: 'Barashk gaining The Dragon\'s Embrace Stage 2',
  },
  "9,11": {
    faction: 'Dragon',
    note: 'Ono gaining The Dragon\'s Embrace',
  },
  "10,11": {
    faction: 'Dragon',
    note: 'Elias gaining The Dragon\'s Embrace',
  }
}

Object.keys(realEntries).forEach(str => {
  let i =str.indexOf(' ');
  let y = str;
  while(i >= 0) {
    y = y.substring(0,i) + y.substring(i+1)
    i = y.indexOf(' ')
  }
  realEntries[y] = realEntries[str]
})

function toAddr(x : number,y : number) : string {
  return x+','+y
}
function adjacent(addr : string, grid : typeof realEntries) : string[] {
  const a = addr.split(',');
  const x = Number.parseInt(a[0]);
  const y = Number.parseInt(a[1]);
  const f = toAddr
  const addrs = [f(x-1,y),f(x+1,y),f(x-1,y+1),f(x,y+1),f(x,y-1),f(x+1,y-1)]
  return addrs.filter(x => grid[x] != undefined)
}

function range(s: number, e: number, step? : number) {
  if(!step) {
    step = 1
  }
  const res : number[] = []
  while(s <= e) {
    res.push(s)
    s += step
  }
  return res
}
function randomDragon() {
//  const dragonKeys = Object.keys(realEntries).filter((x) => realEntries[x].faction === 'Dragon')
  let allAddr = range(1,20).flatMap(x => range(1,20).map(y => toAddr(x,y)))
  const realEntries2 = {...realEntries}
  allAddr.forEach( x => {
    if(realEntries2[x] === undefined) {
      realEntries2[x] = {faction: 'Dungeon'}
    }
  })
  const dungeonKeys = Object.keys(realEntries2).filter((x) => realEntries2[x].faction === 'Dungeon')
  const potentialExpand = dungeonKeys.map(x => {return {addr: x,val: adjacent(x,realEntries2).filter(x => realEntries2[x].faction === 'Dragon').length}}).filter(x => x.val > 0)
  const totalPot = potentialExpand.map(x => x.val).reduce((prev : number, cur : number) => prev+cur)
  let r = Math.floor(Math.random()*totalPot)
  for (const idx in potentialExpand) {
    r = r - potentialExpand[idx].val
    if(r < 0) {
      return potentialExpand[idx].addr
    }
  }
}

console.log('Dragon Expand: '+randomDragon())