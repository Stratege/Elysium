type GM = 'Stratege' | 'Darthgorloc' | 'Minioris' | 'Helian' | 'Awesome'
type Terrain = 'Dungeonstone' | 'Soil' | 'Leyline' | 'Fertile Soil' | 'Cryochambers' | 'Plentiful Metal' | 'Plentiful Dead' | 'Unexplored'
type Faction = 'Nihi' | 'Cove' | 'Thul' | 'Dungeon' | 'Dragon'
type Building = 'HQ' | 'Forge' | 'Chapel' | 'Lab' | 'AC' | 'Barracks'
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

export type { entry, GM, Cost, TreeNode }