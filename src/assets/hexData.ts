import type {entry} from "../util/types";

export const realEntries : {[x:string] : entry} = {
  "10,10": {
    faction:"Dragon",
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
    note: 'Lich; Other GMs feel free to use this hex after asking',
  },
  "6,5": {
    faction: 'Cove',
    owningGM: 'Minioris',
    terrain: 'Plentiful Dead',
  },
  "6,18": {
    faction: 'Nihi',
    owningGM: 'Stratege',
    terrain: 'Plentiful Metal',
  },
  "7,5": {
    faction: 'Dungeon',
    owningGM: 'Minioris',
  },
  "7,4": {
    faction: 'Dungeon',
    owningGM: 'Minioris',
  }
/*  "6,19": {
    faction: 'Nihi',
    owningGM: 'Stratege',
  }*/
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
