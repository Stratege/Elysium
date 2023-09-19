import type {TreeNode} from "../util/types";

const whiptext = "You start with the [Whipping Sorrow] unlocked, a unit that costs 1 Military to deploy and brings back 2 of any basic Resource (players choice)."
const prosytext = "Add [Proselytes] to the military, a basic ranged unit that can be used with [Expeditions] where it costs 1 military and grants 1 gnosis";
const mindbladetext = "Add [Mindblades] to the military, a controler/defender unit that can be used with [Expeditions] where it costs 1 mindsteel and 2 military and grants 3 of any basic resource";
/*
Minister of Pain: 3 Military for 4 Gnosis
Wraith: 1 Military for 1 Labor
Specter: 2 Military for 2 Labor 1 basic resource
Atrocitus: 3 Military for 2 Labor 2 Mindsteel
Prefect: 2 Mindsteel 2 Military for 5 of any basic resource
Consul: 4 Military 2 Gnosis for any 10 resources
*/
const gp = 7
const scry = 8
const sa = 2
const bt = 0
const esp = 10
const nihilimInternal: TreeNode<{desc : string,
  cost : number,
  benefit : string}>[] = [
  { x: gp-1, y: 0, name: "Gnosis Principles", dependOn: [], elem: { desc: "", cost: 4, benefit: "+2 Gnosis/week from Labs. "+prosytext}},
  { x: scry, y: 0, name: "Scrying", dependOn: [], elem: { desc: "", cost: 5, benefit: "Unlock [Nihilim Scouting], which allows the faction during resource allocation phase to Scry a hex adjacent to a conquered one, revealing the terrain, resources and theme of it"}},
  { x: sa, y: 0, name: "Scientific Approach", dependOn: [], elem: { desc: "", cost: 4, benefit: "Parties gain 1 Gnosis whenever they non-violently interact with a mystery. Gnosis carrying capacity increases by 0.25 per hour"}},
  { x: bt, y: 0, name: "Basic Tactics", dependOn: [], elem: { desc: "<see doc>", cost: 1, benefit: "Unlock [Conquest], allowing the faction to expend military to conquer dungeon hexes. Cost starts at 5 military and doubles for each hex conquered per week that way."}},
  { x: gp-1, y: 1, name: "Telepathy", dependOn: ["Gnosis Principles"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: gp, y: 1, name: "Arcane Channeling", dependOn: ["Gnosis Principles"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: scry, y: 2, name: "Precognition", dependOn: ["Scrying","Telepathy"], elem: { desc: "", cost: 1, benefit: "When adventuring in a scried hex, each character can 1/session upgrade the result of a check OR gain information as if they had done an action without committing to the action"}},
  { x: sa+1, y: 1, name: "Faith in Logic", dependOn: ["Scientific Approach"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa, y: 1, name: "Calculated Efficiency", dependOn: ["Scientific Approach"], elem: { desc: "<see doc>", cost: 1, benefit: "+1 wood/metal/stone per week from any building that produces that resources weekly"}},
  { x: gp-1, y: 2, name: "Telekinses", dependOn: ["Telepathy"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: gp-2, y: 2, name: "Mindforging", dependOn: ["Telepathy","Faith in Logic"], elem: { desc: "<see doc>", cost: 1, benefit: "All Nihilim gain a +2 faction bonus to Will saves. Steelsinger consumes 5 more metal/week and produces 5 more Mindsteel/week. "+mindbladetext}},
  { x: gp, y: 2, name: "Arcane Warfare", dependOn: ["Arcane Channeling"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa+1, y: 2, name: "Indoctrination", dependOn: ["Faith in Logic"], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: sa-1, y: 2, name: "Coordinated Scrapping", dependOn: ["Calculated Efficiency"], elem: { desc: "", cost: 1, benefit: "+1 scrap/week"}},
  { x: bt, y: 2, name: "Military Discipline", dependOn: ["Calculated Efficiency","Basic Tactics"], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: sa, y: 2, name: "Shift Planning", dependOn: ["Calculated Efficiency"], elem: { desc: "<see doc>", cost: 1, benefit: "When the Nihilim build a building they immediately gain the resources it would produce and can also use them in that same resource expenditure phase (including for further buildings). Increase basic resource carrying capacity from games by 2 per hour"}},
  { x: sa, y: 3, name: "Total Project Awareness", dependOn: ["Shift Planning"], elem: { desc: "<see doc>", cost: 1, benefit: "Reduce all building costs by 20%, rounded down. This also reduces the labor recovery from scrapping. The overall goes down by as close as up to 20% as possible, taking from highest remaining if uneven is needed."}},
  { x: gp-2, y: 3, name: "Monomind", dependOn: ["Mindforging"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa, y: 4, name: "Unified Labor", dependOn: ["Total Project Awareness"], elem: { desc: "<see doc>", cost: 1, benefit: "Buildings produce 50% more basic resources (after all other bonuses) if next to another basic resource producing building"}},
  { x: scry+1, y: 1, name: "Farscry", dependOn: ["Scrying"], elem: { desc: "", cost: 1, benefit: "when scouting can instead declare a resource, terrain or theme and find a hex where it is abundant. Does NOT work for finding Places of Power"}},
  { x: scry+1, y: 2, name: "Halls of Divination", dependOn: ["Scrying"], elem: { desc: "", cost: 1, benefit: "Unlocks [Halls of Divination], a building that allows 2 more Scryings per week"}},
  { x: gp, y: 3, name: "Mystic Focus", dependOn: ["Arcane Warfare"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: gp, y: 4, name: "Gnosis Truths", dependOn: ["Mystic Focus"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: sa-1, y: 4, name: "Scientific Treatment", dependOn: ["Total Project Awareness"], elem: { desc: "A detached analysis of the patient's illness and a willingness to do structured experiments for cures helps treat many things a lesser healer would consider fatal - even if it sometimes hastens death along in too severe cases.", cost: 1, benefit: "Once per session per player, if they would receive a minor defeat instead they don't."}},
  { x: sa-1, y: 5, name: "Intistutionalized Medical Care", dependOn: ["Scientific Treatment"], elem: { desc: "Maybe it’s the lack of irrational emotions that turns the Nihilim into such technically skilled doctors. When knowledge increases in phase with technology, even death can be defeated. This knowledge will turn Nihilim doctors into excellent healers.", cost: 1, benefit: "Scientific Treatment benefit also applies to Major Defeats. Unlock [Surgery Halls], a building that further boosts this benefit"}},
  { x: sa+1, y: 3, name: "Banish the Emotional", dependOn: ["Indoctrination"], elem: { desc: "The toleration for the ones that doesn’t follow the code of the Nihilim indoctrination is weakening. Either the people choose the calculated and cold path that they once chose to walk, or they will be banished.", cost: 1, benefit: "Labor producing buildings (including HQ) produce -1 labor per week. Any building producing basic resources or Gnosis increases such production by 2."}},
  { x: gp-2, y: 4, name: "Mind Transference", dependOn: ["Monomind"], elem: { desc: "", cost: 1, benefit: "Gain access to the [Gnosis Weave Core] building, which generates labor without the need for cryochambers"}},
  { x: bt, y: 3, name: "Unequaled Stratagems", dependOn: ["Military Discipline"], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: sa+2, y: 1, name: "Gnosis Infused Materials", dependOn: ["Scientific Approach",  "Gnosis Principles"], elem: { desc: "", cost: 1, benefit: "Buildings producing wood/metal/stone weekly gain +2 to each of those resources they already produce for each Lab adjacent to them"}},
  { x: sa+2, y: 2, name: "Durability Science", dependOn: ["Gnosis Infused Materials"], elem: { desc: "", cost: 1, benefit: "May substitute up to half the wood and stone cost of buildings with Metal. Forges gain +1 Scrapyard capacity"}},
  { x: sa+2, y: 4, name: "Transcending the Steel", dependOn: ["Durability Science", "Monomind"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: bt+1, y: 1, name: "Superior Reflexes", dependOn: ["Basic Tactics"], elem: { desc: "", cost: 1, benefit: "Unlock [Expeditions], which allow sending out a squad of units on an Expedition during resource allocation. You can send a single Expedition per week of up to 6 Units. "+whiptext+"\n\nAlso unlocks [Patrols] allowing GMs to use Nihilim units in random encounters, which grant Mindsteel when defeated."}},
  { x: esp, y: 0, name: "Espionage", dependOn: [], elem: { desc: "", cost: 1, benefit: "Players of at least Rep Rank 2 with Nihilim gain access to [Espionage], allowing them to act as Spies while in other games. You can only be a spy for 1 faction at a time and never for the one that the game is for. Basic espionage for Nihilim means you gain 2 Gnosis for the faction instead of Soulstone/Infused Wood."}},
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

const footmentext = "You start with the [Footman] unlocked, a defender unit that costs 1 Military to deploy and brings back 2 of any basic Resource (players choice)."
const preachertext = "Expedition: Preacher - 1 miliatry 1 faith for 2 basic resources + 1 for each Defender unit"
const longbowmentext = "Longbow - 2 military for 2 labor and players can call in a volley once"
const phalanxtext = "Phalanx - 3 military for 5 basic resources"
const prelateaviciatext = "Prelate Avicia - [HERO] (can only deploy one per week) 4 Military, each other unit on the expedition collects +1 resource of a type it already collects"
const vicarezekiustext = "Vicar Ezekius - [HERO] (can only deploy one per week) 5 Military, the expedition can conquer a hex"
const paladintext = "Holy Avenger / Paladin - 1 soulstone 3 military for 8 basic resources and 1 soulstone for each non-Paladin Holy unit"
const knighttext = "Knight - 2 military for 2 labor 1 basic resource"


const dr = 2
const mil = 0
const rec = 4
const espc = 6
const gov = 8
const covenantInternal: TreeNode<{desc : string,
  cost : number,
  benefit : string}>[] = [
  { x: dr, y: 0, name: "Recvover the Teachings", dependOn: [], elem: { desc: "", cost: 1, benefit: "+1 Faith/week for Chapel"}},
  { x: dr, y: 1, name: "Divine Right", dependOn: ["Recvover the Teachings"], elem: { desc: "", cost: 1, benefit: "Unlock [Leaders] which can be used to increase production of a single building by 50% (rounded up) and gain 1 Leader. "+preachertext}},

  { x: dr, y: 3, name: "Risen Heroes", dependOn: ["Divine Right"], elem: { desc: "", cost: 1, benefit: prelateaviciatext}},
  { x: dr, y: 4, name: "Divine Herald", dependOn: ["Risen Heroes"], elem: { desc: "", cost: 1, benefit: vicarezekiustext}},
//  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},

  { x: dr+1, y: 2, name: "Priesthood", dependOn: ["Divine Right"], elem: { desc: "", cost: 1, benefit: "Gain +1 Leader"}},
  { x: dr+1, y: 3, name: "Mending Prayers", dependOn: ["Priesthood"], elem: { desc: "", cost: 1, benefit: "minor defeat clear"}},
  { x: dr+1, y: 4, name: "Sacred Rejuvenation", dependOn: ["Mending Prayers"], elem: { desc: "", cost: 1, benefit: "major defeat clear"}},


  { x: gov, y: 0, name: "g", dependOn: [], elem: { desc: "", cost: 1, benefit: "Buildings producing basic resources gain +1 basic resource production/week"}},
  { x: gov-1, y: 1, name: "f", dependOn: ["g"], elem: { desc: "", cost: 1, benefit: "Forests gain +2 Wood/week and +2 Wood from adjacency/week"}},
  { x: gov, y: 1, name: "q", dependOn: ["g"], elem: { desc: "", cost: 1, benefit: "Quarries gain +2 Stone/week and Core Leechers provide +2 Stone/week to Quarries"}},
  { x: gov+1, y: 1, name: "m", dependOn: ["g"], elem: { desc: "", cost: 1, benefit: "Forges and Scavenging Yards gain +2 metal/week"}},
  { x: gov-1, y: 2, name: "", dependOn: ["f"], elem: { desc: "", cost: 1, benefit: "Can upgrade Forest into [Sovereign's Woods]. Upgrading costs as much as building a Forest and doubles the output and adjacency bonus gained. It counts as a forest for adjacency."}},
  { x: gov, y: 2, name: "", dependOn: ["q"], elem: { desc: "", cost: 1, benefit: "Can upgrade Quarries into [Pits of Spite]. Upgrading costs as much as building a Quarry and doubles the output as well as bonus gained from Core Leechers."}},
  { x: gov+1, y: 2, name: "", dependOn: ["m"], elem: { desc: "", cost: 1, benefit: "Can upgrade Forges into [Manufactories]. Upgrading costs as much as building a Forge and doubles the metal output as well as the amount of scrapyards it can support."}},

  { x: espc, y: 0, name: "Immoral Acts", dependOn: [], elem: { desc: "In the service of our ultimate goal it sometimes becomes necessary to bend lesser laws... like honesty.", cost: 1, benefit: "Players of at least Rep Rank 2 with Covenant gain access to [Espionage], allowing them to act as Spies while in other games. You can only be a spy for 1 faction at a time and never for the one that the game is for. Basic espionage for Covenant you gain your faction basic resources equal to resources gained divided by playercount instead of gaining any Mindsteel or Infused Wood."}},
  { x: espc, y: 1, name: "Embedded Agents", dependOn: ["Immoral Acts"], elem: { desc: "", cost: 1, benefit: "While Spying, when you would normally gain Mindsteel or Infused Wood, the Covenant gain 1 Military"}},

  { x: rec, y: 0, name: "Reconnaissance", dependOn: [], elem: { desc: "", cost: 1, benefit: "Unlock [Covenant Scouting], which allows the faction during resource allocation phase to spend 2 Military to Explore a hex adjacent to a conquered one or explored one, revealing the terrain, resources and theme of it. This can be done twice a week."}},
  { x: rec, y: 1, name: "Exploration", dependOn: ["Reconnaissance"], elem: { desc: "", cost: 1, benefit: "Unlock [Expeditions], which allow sending out a squad of units on an Expedition during resource allocation. You can send a single Expedition per week of up to 6 Units. "+footmentext+" Also unlocks [Patrols] allowing GMs to use Covenant units in random encounters, which grant Soulstone when defeated."}},
  { x: rec, y: 2, name: "Fast Deployment", dependOn: ["Exploration"], elem: { desc: "", cost: 1, benefit: "The first 4 Military spent on Expeditions each week is free. All Covenant get a Free Stride (or other speeds) for half their Speed at the start of combat."}},
  { x: rec+1, y: 2, name: "Expedition Camps", dependOn: ["Exploration"], elem: { desc: "", cost: 1, benefit: "Can construct an [Expedition Camp], a building that provides +2 Expeditions and +2 Scouting for any scouting action within 2 tiles. If the Expedition Camp is fully surrounded by friendly buildings it is automatically scrapped for a recovery of the full cost and without taking a scrapping"}},
  { x: rec, y: 3, name: "Search the Divine", dependOn: ["Fast Deployment"], elem: { desc: "", cost: 1, benefit: "Expeditions have a 10% chance of finding a [Shard of Ramathos], needed for high level research and buildings"}},
  { x: rec, y: 4, name: "Eyes of Ramatos", dependOn: ["Search the Divine"], elem: { desc: "", cost: 1, benefit: "Allows constructing the [Eyes of Ramatos] a building which reveals all hexes within a radius of 5 and in the same radius any Covenant has Perfect True Seeing, which works like True Seeing but automatically succeeds on all counteract checks against non-perfect effects"}},

  { x: mil, y: 0, name: "Standing Military", dependOn: [], elem: { desc: "", cost: 1, benefit: "Unlock [Conquest], allowing the faction to expend military to conquer dungeon hexes. Cost starts at 5 military and doubles for each hex conquered per week that way."}},
  { x: mil, y: 1, name: "Mandatory Service", dependOn: ["Standing Military"], elem: { desc: "", cost: 1, benefit: "Barracks require +1 Labor/week and produce +2 Military/week"}},
  { x: mil+1, y: 1, name: "Archery", dependOn: ["Standing Military"], elem: { desc: "", cost: 1, benefit: longbowmentext}},
  { x: mil+1, y: 2, name: "Cavalry", dependOn: ["Mandatory Service"], elem: { desc: "", cost: 1, benefit: knighttext}},
  { x: mil, y: 2, name: "Strongholds", dependOn: ["Mandatory Service"], elem: { desc: "", cost: 1, benefit: "Can upgrade Barracks into [Stronghold], this upgrade costs as much as building a Barracks and doubles weekly worker cost and Military production"}},
  { x: mil+1, y: 3, name: "Phalanx", dependOn: ["Strongholds"], elem: { desc: "", cost: 1, benefit: phalanxtext}},
  { x: mil, y: 3, name: "idk", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: mil+1, y: 4, name: "Holy Avengers", dependOn: ["idk","Risen Heroes"], elem: { desc: "", cost: 1, benefit: paladintext}},
/*


  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},


  Footmen - 1 military for 2 basic resources
  Holy Avenger / Paladin - 1 soulstone 3 military for 8 basic resources and 1 soulstone for each non-Paladin Holy unit
  Preacher - 1 miliatry 1 faith for 2 basic resources + 1 for each Defender unit
  Phalanx - 3 military for 5 basic resources
  Longbow - 2 military for 2 labor and players can call in a volley once
  Prelate Avicia - [HERO] (can only deploy one per week)
  Vicar Ezekius - [HERO] (can only deploy one per week) 5 Military, the expedition can conquer a hex
 */
]

/*
  Questing Knights - can collect faith in session
   - better Hero
  Providence



  Prospecting
  Army Service
  Vigilance
  Spiritual Healing
  Tree Felling
  Fracturing
  Induration

  Soldiering
  Theology
  Exoneration

  Battlefield Strategy
  Protectorates
  Dogma
  Convict Segregation
  Detachment

  Return to Genesis
  Dominion
  True Faith
  Ambrosia
  Unfettered Clergy
  Consecrating the Woods
  Consecrating the Mountains
  Consecrating the Earth
 */

const thulInternal: TreeNode<{desc : string,
  cost : number,
  benefit : string}>[] = [
  { x: 0, y: 0, name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  //  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
]

function fix (x : TreeNode<{desc : string,
  cost : number,
  benefit : string}>)  {
    let elem = {name: x.name, ...x.elem}
    let ret = {...x, elem}
    return ret
}

console.log("nihi - len: "+nihilimInternal.length+", cost: "+nihilimInternal.map(x => x.elem.cost).reduce((prev,cur) => prev+cur))
console.log("cove - len: "+covenantInternal.length+", cost: "+covenantInternal.map(x => x.elem.cost).reduce((prev,cur) => prev+cur))
console.log("thul - len: "+thulInternal.length+", cost: "+thulInternal.map(x => x.elem.cost).reduce((prev,cur) => prev+cur))
export const nihilim = nihilimInternal.map(fix)
export const covenant = covenantInternal.map(fix)
export const thul = thulInternal.map(fix)
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
      Whip: 1 Military for any 2 basic resource
      Prosy: 1 Military for 2 gnosis
      Mindblade: 1 Mindsteel + 2 Military for 5 of any basic resource
      Minister of Pain: 3 Military for 5 Gnosis
      Wraith: 1 Military for 1 Labor
      Specter: 2 Military for 2 Labor 1 basic resource
      Atrocitus: 3 Military for 2 Labor 2 Mindsteel
      Prefect: 2 Mindsteel 2 Military for 8 of any basic resource
      Consul: 4 Military 2 Gnosis for any 10 of any resource other than military


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
