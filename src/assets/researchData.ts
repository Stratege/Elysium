import type {TreeNode} from "../util/types";

const gp = 6
const scry = 7
const sa = 1
const bt = 9
const nihilimInternal: TreeNode<{desc : string,
  cost : number,
  benefit : string}>[] = [
  { x: gp, y: 0, name: "Gnosis Principles", dependOn: [], elem: { desc: "", cost: 1, benefit: "+2 Gnosis/week from Labs"}},
  { x: scry, y: 0, name: "Scrying", dependOn: [], elem: { desc: "", cost: 1, benefit: "Unlock [Nihilim Scouting]"}},
  { x: sa, y: 0, name: "Scientific Approach", dependOn: [], elem: { desc: "", cost: 1, benefit: "Parties gain 1 Gnosis whenever they non-violently interact with a mystery. Gnosis carrying capacity increases by 0.25 per hour"}},
  { x: bt, y: 0, name: "Basic Tactics", dependOn: [], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: gp-1, y: 1, name: "Telepathy", dependOn: ["Gnosis Principles"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: gp, y: 1, name: "Arcane Channeling", dependOn: ["Gnosis Principles"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: scry, y: 2, name: "Clairvoyance", dependOn: ["Scrying","Telepathy"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa+1, y: 1, name: "Faith in Logic", dependOn: ["Scientific Approach"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa, y: 1, name: "Leadership", dependOn: ["Scientific Approach"], elem: { desc: "<see doc>", cost: 1, benefit: "+1 wood/metal/stone per week from any building that produces that resources weekly"}},
  { x: gp-1, y: 2, name: "Telekinses", dependOn: ["Telepathy"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: gp-2, y: 2, name: "Mindforging", dependOn: ["Telepathy","Faith in Logic"], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: gp, y: 2, name: "Arcane Warfare", dependOn: ["Arcane Channeling"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa+1, y: 2, name: "Indoctrination", dependOn: ["Faith in Logic"], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: sa-1, y: 2, name: "Coordinated Scrapping", dependOn: ["Leadership"], elem: { desc: "", cost: 1, benefit: "+1 scrap/week"}},
  { x: bt, y: 2, name: "Military Discipline", dependOn: ["Leadership","Basic Tactics"], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: sa, y: 2, name: "Shift Planning", dependOn: ["Leadership"], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: sa, y: 3, name: "Total Project Awareness", dependOn: ["Shift Planning"], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: gp-2, y: 3, name: "Monomind", dependOn: ["Mindforging"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa, y: 4, name: "Unified Labor", dependOn: ["Total Project Awareness"], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: scry+1, y: 1, name: "Farscry", dependOn: ["Scrying"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: scry+1, y: 2, name: "Halls of Divination", dependOn: ["Scrying"], elem: { desc: "", cost: 1, benefit: "Unlocks [Halls of Divination], a building that gives +2 weekly scout capacity"}},
  { x: gp, y: 3, name: "Mystic Focus", dependOn: ["Arcane Warfare"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: gp, y: 4, name: "Gnosis Truths", dependOn: ["Mystic Focus"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa-1, y: 4, name: "Scientific Treatment", dependOn: ["Total Project Awareness"], elem: { desc: "", cost: 1, benefit: "Once per session per player, if they would receive a minor defeat instead they don't."}},
  { x: sa-1, y: 5, name: "Intistutionalized Medical Care", dependOn: ["Scientific Treatment"], elem: { desc: "<desc (desc so hard, it is a good one)>", cost: 1, benefit: "Scientific Treatment benefit also applies to Major Defeats. Unlock [Surgery Halls], a building that further boosts this benefit"}},
  { x: sa+1, y: 3, name: "Banish the Emotional", dependOn: ["Indoctrination"], elem: { desc: "<see \"ages of hate\" doc>", cost: 1, benefit: ""}},
  { x: gp-2, y: 4, name: "Mind Transference", dependOn: ["Monomind"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: bt, y: 3, name: "Unequaled Stratagems", dependOn: ["Military Discipline"], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: sa+2, y: 1, name: "Gnosis Infused Materials", dependOn: ["Scientific Approach",  "Gnosis Principles"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa+2, y: 2, name: "Durability Science", dependOn: ["Gnosis Infused Materials"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa+3, y: 3, name: "Transcending the Steel", dependOn: ["Durability Science"], elem: { desc: "", cost: 1, benefit: ""}},

  { x: gp-1, y: 6, name: "Omnipotence", dependOn: ["Gnosis Truths", "Mind Transference"], elem: { desc: "", cost: 1, benefit: "Can construct [Pillars of Ascension] which allow the Deity to fully manifest if the preparations are done"}},
  /*
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: 99, y: 99, name: "Mind Transference", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},*/
]



export const nihilim = nihilimInternal.map(x => {
  let elem = {name: x.name, ...x.elem}
  let ret = {...x, elem}
  return ret
})
/*
second sight

impetus supreme - desc
mind control - desc
arcane channeling
soulbinding - desc
arcane warfare - desc
focused horror - desc????


Martial Training
War Strategies - desc
The Speed of Pain - desc????
Clarity of One - desc
Superior Reflexes
Dual Thought - desc
Total Presence - desc


Coordinated Scrapping
--this section is a bit weak--
Refining
Alloys
Wood Tempering
Blanket Deforestation
Stripmining
Striking in the rythm - rename, something about nihi cooperation for efficiency
----

Deceitful Magicks
Psychic Agency

---------

*/