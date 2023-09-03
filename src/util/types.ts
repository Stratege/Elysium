type GM = 'Stratege' | 'Darthgorloc' | 'Minioris'
type Terrain = 'Dungeonstone' | 'Soil' | 'Place of Power' | 'Unexplored'
type Faction = 'Nihi' | 'Cove' | 'Thul' | 'Dungeon' | 'Dragon'
type Building = 'HQ'
type entry = {
  faction : Faction
  building?: Building
  owningGM?: GM
  terrain?: Terrain
  note?: string
}

export type { entry, GM }