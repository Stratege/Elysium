type GM = 'Stratege' | 'Darthgorloc' | 'Minioris'
type Terrain = 'Dungeonstone' | 'Soil' | 'Place of Power' | 'Plentiful Metal' | 'Plentiful Dead' | 'Unexplored'
type Faction = 'Nihi' | 'Cove' | 'Thul' | 'Dungeon' | 'Dragon'
type Building = 'HQ'
type entry = {
  faction : Faction
  building?: Building
  owningGM?: GM
  terrain?: Terrain
  note?: string
}

type SpecialResource = 'Soulstone' | 'Infused Wood' | 'Mindsteel'
type Cost = {
  kind : SpecialResource | 'All' | 'Any'
  amount : number
}
type TreeNode<T> = {
  x : number,
  y : number,
  name : string,
  dependOn : string[],
  elem : T,
}

type ResearchCost = { wood? : number, stone? : number, metal? : number, other: string }
export type { entry, GM, Cost, ResearchCost, TreeNode }