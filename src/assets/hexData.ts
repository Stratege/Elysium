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
    faction: 'Dungeon',
    owningGM: 'Stratege',
  },
  "6,19": {
    faction: 'Nihi',
    owningGM: 'Stratege',
  }
}