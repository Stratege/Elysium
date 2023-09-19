import type {TreeNode} from "../util/types";

const gp = 7
const scry = 8
const sa = 2
const bt = 0
const esp = 10
const nihilimInternal: TreeNode<{desc : string,
  cost : number,
  benefit : string}>[] = [
  { x: gp-1, y: 0, name: "Gnosis Principles", dependOn: [], elem: { desc: "", cost: 4, benefit: "+2 Gnosis/week from Labs. Add [Proselytes] to the military, a basic ranged unit"}},
  { x: scry, y: 0, name: "Scrying", dependOn: [], elem: { desc: "", cost: 5, benefit: "Unlock [Nihilim Scouting], which allows the faction during resource allocation phase to Scry a hex adjacent to a conquered one, revealing the terrain, resources and theme of it"}},
  { x: sa, y: 0, name: "Scientific Approach", dependOn: [], elem: { desc: "", cost: 4, benefit: "Parties gain 1 Gnosis whenever they non-violently interact with a mystery. Gnosis carrying capacity increases by 0.25 per hour"}},
  { x: bt, y: 0, name: "Basic Tactics", dependOn: [], elem: { desc: "<see doc>", cost: 1, benefit: "Unlock [Conquest], allowing the faction to expend military to conquer dungeon hexes. Cost starts at 5 military and doubles for each hex conquered this week that way."}},
  { x: gp-1, y: 1, name: "Telepathy", dependOn: ["Gnosis Principles"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: gp, y: 1, name: "Arcane Channeling", dependOn: ["Gnosis Principles"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: scry, y: 2, name: "Precognition", dependOn: ["Scrying","Telepathy"], elem: { desc: "", cost: 1, benefit: "When adventuring in a scried hex, each character can 1/session upgrade the result of a check OR gain information as if they had done an action without committing to the action"}},
  { x: sa+1, y: 1, name: "Faith in Logic", dependOn: ["Scientific Approach"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa, y: 1, name: "Leadership", dependOn: ["Scientific Approach"], elem: { desc: "<see doc>", cost: 1, benefit: "+1 wood/metal/stone per week from any building that produces that resources weekly"}},
  { x: gp-1, y: 2, name: "Telekinses", dependOn: ["Telepathy"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: gp-2, y: 2, name: "Mindforging", dependOn: ["Telepathy","Faith in Logic"], elem: { desc: "<see doc>", cost: 1, benefit: "All Nihilim gain a +2 faction bonus to Will saves. Steelsinger consumes 5 more metal/week and produces 5 more Mindsteel/week. Unlock [Mindblade] for Expeditions, a Controller/Defender unit which costs 1 Mindsteel and 2 Military to deploy on an expedition but provides 3 of any basic resource"}},
  { x: gp, y: 2, name: "Arcane Warfare", dependOn: ["Arcane Channeling"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa+1, y: 2, name: "Indoctrination", dependOn: ["Faith in Logic"], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: sa-1, y: 2, name: "Coordinated Scrapping", dependOn: ["Leadership"], elem: { desc: "", cost: 1, benefit: "+1 scrap/week"}},
  { x: bt, y: 2, name: "Military Discipline", dependOn: ["Leadership","Basic Tactics"], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: sa, y: 2, name: "Shift Planning", dependOn: ["Leadership"], elem: { desc: "<see doc>", cost: 1, benefit: "When the Nihilim build a building they immediately gain the resources it would produce and can also use them in that same resource expenditure phase (including for further buildings). Increase basic resource carrying capacity from games by 2 per hour"}},
  { x: sa, y: 3, name: "Total Project Awareness", dependOn: ["Shift Planning"], elem: { desc: "<see doc>", cost: 1, benefit: "Reduce all building costs by 20%, rounded down. This also reduces the labor recovery from scrapping. The overall goes down by as close as up to 20% as possible, taking from highest remaining if uneven is needed."}},
  { x: gp-2, y: 3, name: "Monomind", dependOn: ["Mindforging"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa, y: 4, name: "Unified Labor", dependOn: ["Total Project Awareness"], elem: { desc: "<see doc>", cost: 1, benefit: "Buildings produce 50% more basic resources (after all other bonuses) if next to another basic resource producing building"}},
  { x: scry+1, y: 1, name: "Farscry", dependOn: ["Scrying"], elem: { desc: "", cost: 1, benefit: "when scouting can instead declare a resource, terrain or theme and find a hex where it is abundant. Does NOT work for finding Places of Power"}},
  { x: scry+1, y: 2, name: "Halls of Divination", dependOn: ["Scrying"], elem: { desc: "", cost: 1, benefit: "Unlocks [Halls of Divination], a building that allows 2 more Scryings per week"}},
  { x: gp, y: 3, name: "Mystic Focus", dependOn: ["Arcane Warfare"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: gp, y: 4, name: "Gnosis Truths", dependOn: ["Mystic Focus"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa-1, y: 4, name: "Scientific Treatment", dependOn: ["Total Project Awareness"], elem: { desc: "", cost: 1, benefit: "Once per session per player, if they would receive a minor defeat instead they don't."}},
  { x: sa-1, y: 5, name: "Intistutionalized Medical Care", dependOn: ["Scientific Treatment"], elem: { desc: "<desc (desc so hard, it is a good one)>", cost: 1, benefit: "Scientific Treatment benefit also applies to Major Defeats. Unlock [Surgery Halls], a building that further boosts this benefit"}},
  { x: sa+1, y: 3, name: "Banish the Emotional", dependOn: ["Indoctrination"], elem: { desc: "The toleration for the ones that doesn’t follow the code of the Nihilim indoctrination is weakening. Either the people choose the calculated and cold path that they once chose to walk, or they will be banished.", cost: 1, benefit: ""}},
  { x: gp-2, y: 4, name: "Mind Transference", dependOn: ["Monomind"], elem: { desc: "", cost: 1, benefit: "Gain access to the [Gnosis Weave Core] building, which generates labor without the need for cryochambers"}},
  { x: bt, y: 3, name: "Unequaled Stratagems", dependOn: ["Military Discipline"], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: sa+2, y: 1, name: "Gnosis Infused Materials", dependOn: ["Scientific Approach",  "Gnosis Principles"], elem: { desc: "", cost: 1, benefit: "Buildings producing wood/metal/stone weekly gain +2 to each of those resources they already produce for each Lab adjacent to them"}},
  { x: sa+2, y: 2, name: "Durability Science", dependOn: ["Gnosis Infused Materials"], elem: { desc: "", cost: 1, benefit: "May substitute up to half the wood and stone cost of buildings with Metal. Forges gain +1 Scrapyard capacity"}},
  { x: sa+2, y: 4, name: "Transcending the Steel", dependOn: ["Durability Science", "Monomind"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: bt+1, y: 1, name: "Superior Reflexes", dependOn: ["Basic Tactics"], elem: { desc: "", cost: 1, benefit: "Unlock [Expeditions], which allow sending out a squad of units on an Expedition during resource allocation. You can send a single Expedition per week of up to 6 Units. You start with the [Whipping Sorrow] unlocked, a unit that costs 2 Military to deploy and brings back 1 of any basic Resource (players choice).\n\nAlso unlocks [Patrols] allowing GMs to use Nihilim units in random encounters, which grant Mindsteel when defeated."}},
  { x: esp, y: 0, name: "Espionage", dependOn: [], elem: { desc: "", cost: 1, benefit: "Players of at least Rep Rank 3 with Nihilim gain access to [Espionage], allowing them to act as Spies while in other games. You can only be a spy for 1 faction at a time and never for the one that the game is for. Basic espionage for Nihilim mean you gain Gnosis for the faction instead of Soulstone/Infused Wood."}},
  { x: esp, y: 1, name: "Black Ops", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: esp+1, y: 2, name: "Deceitful Magicks", dependOn: ["Espionage"], elem: { desc: "", cost: 1, benefit: "When engaging in Espionage, the Nihilim gain an amount of basic resources equal to the amount earned divided by playercount."}},
  { x: esp, y: 3, name: "Psychic Agency", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
/*  { x: , y: , name: "Dual Thought", dependOn: [], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: , y: , name: "Total Presence", dependOn: [], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: , y: , name: "Clarity of One", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},*/
  { x: gp-1, y: 6, name: "Omnipotence", dependOn: ["Gnosis Truths", "Mind Transference","Total Presence"], elem: { desc: "", cost: 1, benefit: "Can construct [Pillars of Ascension] which allow the Deity to fully manifest if the preparations are done. Also unlocks [Consul] for Expeditions."}},
  { x: gp-1, y: 7, name: "Ascendance", dependOn: ["Omnipotence"], elem: { desc: "Special: Requires 3 [Pillars of Ascension] to be constructed", cost: 1, benefit: "After completing the [The Throne Of God Is Empty] raid, the Nihilim gain complete control over the dungeon."}}
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

/*
mechanics:
  Scout - gain scout capacity, roll on d20 terrain table and find out what it is
      farscry:  bot rolls and outputs closest rolled of desired terrain
  Combat: send 5 military to conquer a hex, cost doubles for each additional hex conquered this way that week
    - maybe research that can decrease the speed of increase?
  Expeditions:
    - other factions can now encounter (and fight) expeditions (which grants rare resources)
    - your faction can send out patrols for military power (and possibly other resources)
      - patrol size caps at 6 (8?) (4?)
      - patrols earn resources
      - unlock units you can change patrols up with
      - better units increase gains (and can bring back research/mats)
      Whip: 2 Military for any 1 basic resource
      Prosy: 1 Military for 1 gnosis
      Mindblade: 1 Mindsteel + 2 Military for 3 of any basic resource
      Minister of Pain: 3 Military for 4 Gnosis
      Wraith: 1 Military for 1 Labor
      Specter: 2 Military for 2 Labor 1 basic resource
      Atrocitus: 3 Military for 2 Labor 2 Mindsteel
      Prefect: 2 Mindsteel 2 Military for 5 of any basic resource
      Consul: 4 Military 2 Gnosis for any 10 resources


  espionage = benefits when helping other factions
    get gnosis when helping another faction, additional when doing other faction objectives
    get military and rep when helping others
    gain additional personal resources

 */

/*
portal subsystem:
  - depthcrawl
  - 1 encounter turn per move
- no direction / divination / prophecy / teleportation
- spellcasting is "golden opportunity" (unless it's Heal or Dmg spells)
- college automatically gains deeds and can reroll a check made with college wayfinder and choose a result and can ignore first corruption result
- weird places (but unimportant)

  rations spoil and rest is impossible
  4 things you can do:
    - stay where you are at
    - go deeper
    -
    -
  Corruptions is permanent
  Find Astralium which provides buffs

 */
