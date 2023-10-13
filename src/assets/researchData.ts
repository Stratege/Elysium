import type {TreeNode} from "../util/types";

const whiptext = "You start with the [Whipping Sorrow] unlocked, a unit that costs 1 Military to deploy and brings back 2 of any basic Resource (players choice)."
const prosytext = "Add [Proselytes] to the military, a basic ranged unit that can be used with [Expeditions] where it costs 1 Military and collects 2 Gnosis";
const mindbladetext = "Add [Mindblades] to the military, a controller/defender unit that can be used with [Expeditions] where it costs 1 Mindsteel and 2 Military and collects 3 of any basic resource";
const ministerofpaintext = "Add [MoP] to the military, a controller/artillery unit that can be used with [Expeditions] where it costs 3 Military and collects 5 Gnosis"
const wraithtext = "Unlock Unit [W], cost 1 Military for 1 Worker"
const spectertext = "Unlock Unit [S], cost 2 Military for 2 Workers, 2 basic resources"
const atrocitustext = "Unit [A], cost 3 Military for 2 Workers, 2 Mindsteel"
const prefecttext = "Unlock Unit [P], cost 2 Mindsteel 2 Military for 5 of any basic resources"
const consultext = "Unlock Unit [C], cost 4 Military 2 Gnosis for any 10 non-Military resources"

const gp = 7
const scry = 8
const sa = 2
const bt = 0
const esp = 10
let nihilimInternal: TreeNode<{desc : string,
  cost : number,
  benefit : string}>[] = [
  { x: gp-1, y: 0, name: "Gnosis Principles", dependOn: [], elem: { desc: "", cost: 4, benefit: "+2 Gnosis/week from Labs. "+prosytext}},
  { x: scry, y: 0, name: "Scrying", dependOn: [], elem: { desc: "", cost: 5, benefit: "Unlock [Nihilim Scouting], which allows the faction during resource allocation phase to Scry a hex adjacent to a conquered one, revealing the terrain, resources and theme of it"}},
  { x: sa, y: 0, name: "Scientific Approach", dependOn: [], elem: { desc: "", cost: 4, benefit: "Parties gain 1 Gnosis whenever they non-violently interact with a mystery. Gnosis carrying capacity increases by 0.25 per hour"}},
  { x: bt, y: 0, name: "Basic Tactics", dependOn: [], elem: { desc: "<see doc>", cost: 5, benefit: "Unlock [Conquest], allowing the faction to expend Military to conquer dungeon hexes. Cost starts at 5 Military and doubles for each hex conquered per week that way. (Each such hex needs to either be unclaimed or have the claiming GM agree to it being conquerable this way)"}},
  { x: gp-1, y: 1, name: "Telepathy", dependOn: ["Gnosis Principles"], elem: { desc: "", cost: 1, benefit: "Labs that are exactly 2 hexes away from another lab gain another 3 Gnosis/week. 1/session when entering from the Nihilim entrance or of Rep 4 Nihi a PC can enter telepathic communication with another willing character for 1 hour, sight (or similiar) is needed to establish but not maintain the connection."}},
  { x: gp, y: 1, name: "Arcane Channeling", dependOn: ["Gnosis Principles"], elem: { desc: "", cost: 1, benefit: "The Nihilim may now overcharge a building during the Resource Allocation phase, making it immediately produce its normal production, however the next two times it would normally produce resources it does not. An overcharged building can not be overcharged again until this time has passed."}},
  { x: scry, y: 2, name: "Precognition", dependOn: ["Scrying","Telepathy"], elem: { desc: "", cost: 1, benefit: "When adventuring in a scried hex, each character can 1/session upgrade the result of a check OR gain information as if they had done an action without committing to the action"}},
  { x: sa+1, y: 1, name: "Expectations of High Quality Outcomes via the Use of Logic", dependOn: ["Scientific Approach"], elem: { desc: "Nihilim cultivate a mindset that others might refer to as 'having faith in logic'", cost: 1, benefit: "Whenever Nihilim spend at least 5 Gnosis on something they gain 2 Gnosis."}},
  { x: sa, y: 1, name: "Calculated Efficiency", dependOn: ["Scientific Approach"], elem: { desc: "<see doc>", cost: 1, benefit: "+1 wood/metal/stone per week from any building that produces that resources weekly"}},
  { x: gp-1, y: 2, name: "Telekinses", dependOn: ["Telepathy"], elem: { desc: "", cost: 1, benefit: "Anytime a building is exactly 2 hexes from a building of the same type its output increases by 3. This does not stack with the benefits from Telepathy"}},
  { x: gp-2, y: 2, name: "Mindforging", dependOn: ["Telepathy","Expectations of High Quality Outcomes via the Use of Logic"], elem: { desc: "<see doc>", cost: 1, benefit: "All Nihilim gain a +2 faction bonus to Will saves. Steelsinger consumes 5 more metal/week and produces 5 more Mindsteel/week. "+mindbladetext}},
  { x: gp, y: 2, name: "Arcane Warfare", dependOn: ["Arcane Channeling"], elem: { desc: "", cost: 1, benefit: "Can now overcharge a unit type, making it produce 50% more resources this week but be unable to be deployed for the next 2 weeks afterwards. "+ministerofpaintext}},
  { x: sa+1, y: 2, name: "Indoctrination", dependOn: ["Expectations of High Quality Outcomes via the Use of Logic"], elem: { desc: "<see doc>", cost: 1, benefit: ""+wraithtext}},
  { x: sa-1, y: 2, name: "Coordinated Scrapping", dependOn: ["Calculated Efficiency"], elem: { desc: "", cost: 1, benefit: "+1 scrap/week"}},
  { x: bt, y: 2, name: "Military Discipline", dependOn: ["Calculated Efficiency","Basic Tactics"], elem: { desc: "<see doc>", cost: 1, benefit: "Whenever Military is expended, recover 40% (rounded down) after the Resource Allocation phase ends"}},
  { x: sa, y: 2, name: "Shift Planning", dependOn: ["Calculated Efficiency"], elem: { desc: "<see doc>", cost: 1, benefit: "When the Nihilim build a building they immediately gain the resources it would produce and can also use them in that same resource allocation phase (including for further buildings). Increase basic resource carrying capacity from games by 2 per hour"}},
  { x: sa, y: 3, name: "Total Project Awareness", dependOn: ["Shift Planning"], elem: { desc: "<see doc>", cost: 1, benefit: "Reduce all building costs by 20%, rounded down. This also reduces the Workers recovered from scrapping. The overall goes down by as close as up to 20% as possible, taking from highest remaining if uneven is needed."}},
  { x: gp-2, y: 3, name: "Monomind", dependOn: ["Mindforging"], elem: { desc: "", cost: 1, benefit: "Gain access to the [Gnosis Weave Core] building, which generates Workers without the need for cryochambers"}},
  { x: sa, y: 4, name: "Unified Labor", dependOn: ["Total Project Awareness"], elem: { desc: "<see doc>", cost: 1, benefit: "Buildings produce 50% more basic resources (after all other bonuses) if next to another basic resource producing building"}},
  { x: scry+1, y: 1, name: "Farscry", dependOn: ["Scrying"], elem: { desc: "", cost: 1, benefit: "when scouting can instead declare a resource, terrain or theme and find a hex where it is abundant. Does NOT work for finding Leylines"}},
  { x: scry+1, y: 2, name: "Halls of Divination", dependOn: ["Scrying"], elem: { desc: "", cost: 1, benefit: "Unlocks [Halls of Divination], a building that allows 2 more Scryings per week"}},
  { x: gp, y: 3, name: "Mystic Focus", dependOn: ["Arcane Warfare"], elem: { desc: "", cost: 1, benefit: ""}},
  { x: gp, y: 4, name: "Gnosis Truths", dependOn: ["Mystic Focus"], elem: { desc: "", cost: 1, benefit: "Unlocks the [?], a wonder-type building that provides research benefits"}},
  { x: sa-1, y: 4, name: "Scientific Treatment", dependOn: ["Total Project Awareness"], elem: { desc: "A detached analysis of the patient's illness and a willingness to do structured experiments for cures helps treat many things a lesser healer would consider fatal - even if it sometimes hastens death along in too severe cases.", cost: 1, benefit: "Once per session per player, if they would receive a minor defeat instead they don't. If Arcane Warfare is researched, also unlock "+atrocitustext}},
  { x: sa-1, y: 5, name: "Intistutionalized Medical Care", dependOn: ["Scientific Treatment"], elem: { desc: "Maybe it’s the lack of irrational emotions that turns the Nihilim into such technically skilled doctors. When knowledge increases in phase with technology, even death can be defeated. This knowledge will turn Nihilim doctors into excellent healers.", cost: 1, benefit: "Scientific Treatment benefit also applies to Major Defeats. Unlock [Surgery Halls], a wonder-type building that further boosts this benefit"}},
  { x: sa+1, y: 3, name: "Banish the Emotional", dependOn: ["Indoctrination"], elem: { desc: "The toleration for the ones that doesn’t follow the code of the Nihilim indoctrination is weakening. Either the people choose the calculated and cold path that they once chose to walk, or they will be banished.", cost: 1, benefit: "Workers producing buildings (including HQ) produce -1 Worker per week. Any building producing basic resources or Gnosis increases such production by 3."+spectertext}},
  { x: gp-2, y: 4, name: "Mind Transference", dependOn: ["Monomind"], elem: { desc: "", cost: 1, benefit: "Unlock [Spire of Transference] a wonder-type building that allows PCs to transfer their minds into Automaton bodies for the stay in Elysium. Also allows customizing Gnosis Weave Buildings to increase their output and produce other outputs."}},
  { x: bt, y: 3, name: "Unequaled Stratagems", dependOn: ["Military Discipline"], elem: { desc: "<see doc>", cost: 1, benefit: "Increase the Military Recovery to 50% and gain it immediately. "+prefecttext}},
  { x: sa+2, y: 1, name: "Gnosis Infused Materials", dependOn: ["Scientific Approach",  "Gnosis Principles"], elem: { desc: "", cost: 1, benefit: "Non-HQ Buildings producing wood/metal/stone weekly gain +2 to each of those resources they already produce for each Lab adjacent to them"}},
  { x: sa+2, y: 2, name: "Durability Science", dependOn: ["Gnosis Infused Materials"], elem: { desc: "", cost: 1, benefit: "May substitute up to half the wood and stone cost of buildings with Metal. Forges gain +1 Scrapyard capacity"}},
  { x: sa+2, y: 4, name: "Transcending the Steel", dependOn: ["Durability Science", "Monomind"], elem: { desc: "The Nihilim learn to transcend the normal limits of steel by recreating their alloys of old out of base materials.", cost: 1, benefit: "All Nihilim metal enhanced items gain +1 to item bonus. Scrapyard output increases by 10 metal/week. Gnosis Weave Cores non-Metal and Mindsteel costs are replaced fully with Metal costs."}},
  { x: bt+1, y: 1, name: "Superior Reflexes", dependOn: ["Basic Tactics"], elem: { desc: "", cost: 1, benefit: "Unlock [Expeditions], which allow sending out a squad of units on an Expedition during resource allocation. You can send a single Expedition per week of up to 6 Units. "+whiptext+"\n\nAlso unlocks [Patrols] allowing GMs to use Nihilim units in random encounters, which grant Mindsteel when defeated."}},
  { x: esp, y: 0, name: "Espionage", dependOn: [], elem: { desc: "", cost: 1, benefit: "Players of at least Rep Rank 2 with Nihilim gain access to [Espionage], allowing them to act as Spies while in other games. You can only be a spy for 1 faction at a time and never for the one that the game is for. Basic espionage for Nihilim means you gain 2 Gnosis for the faction instead of Soulstone/Infused Wood."}},
  { x: esp, y: 1, name: "Black Ops", dependOn: ["Espionage"], elem: { desc: "", cost: 1, benefit: "When engaging in Espionage, whenever you would get reputation you may instead gain Nihilim Reputation"}},
  { x: esp+1, y: 2, name: "Deceitful Magicks", dependOn: ["Espionage"], elem: { desc: "", cost: 1, benefit: "When engaging in Espionage, the Nihilim gain an amount of basic resources equal to the amount earned divided by playercount."}},
  { x: esp, y: 3, name: "Psychic Agency", dependOn: ["Black Ops", "Arcane Warfare", "Precognition"], elem: { desc: "", cost: 1, benefit: "Unlock [Psychic Agency] a wonder-type building that allows Nihilim to benefit from Covenant and Thul technologies"}},
/*  { x: , y: , name: "Dual Thought", dependOn: [], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: , y: , name: "Total Presence", dependOn: [], elem: { desc: "<see doc>", cost: 1, benefit: ""}},
  { x: , y: , name: "Clarity of One", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},*/
  { x: gp-1, y: 6, name: "Omnipotence", dependOn: ["Gnosis Truths", "Mind Transference","Total Presence"], elem: { desc: "", cost: 1, benefit: "Can construct [Pillars of Ascension] which allow the Deity to fully manifest if the preparations are done. "+consultext}},
  { x: gp-1, y: 7, name: "Deus ex Machina", dependOn: ["Omnipotence"], elem: { desc: "Special: Requires 3 [Pillars of Ascension] to be constructed", cost: 1, benefit: "After completing the [The Throne Of God Is Empty] raid, the Nihilim gain complete control over the dungeon."}}
  /*
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: 99, y: 99, name: "Mind Transference", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},*/
]

const footmentext = "You start with the [Knight Exemplar] unlocked, a defender unit that costs 1 Military to deploy and brings back 2 of any basic Resource (players choice)."
const preachertext = "Unlock the [Preacher], a holy support unit which costs 1 Miliatry and  1 Faith to deploy and brings back 2 Basic Resources + 1 for each Defender unit on the same expedition"
const longbowmentext = "Unlock the [Exemplar Harbinger], a ranged unit that costs 2 Military to deploy and brings back 2 Workers. In the following week, for each Exemplar Harbinger deployed, players can call in a volley strike once"
const phalanxtext = "Unlock the [Exemplar Bastion], a defender unit that costs 3 Military to deploy and brings back 5 basic resources"
const prelateaviciatext = "Unlock [Prelate Avicia], a holy hero unit (can only deploy one per week) for 4 Military, each other unit on the expedition collects +1 resource of a type it already collects"
const vicarezekiustext = "Unlock [Vicar Ezekius], a holy hero unit (can only deploy one per week) for 5 Military allowing the expedition to conquer a hex"
const paladintext = "Unlock the [Holy Avenger], a holy unit that costs 1 Soulstone and 3 Military to deploy and brings back 8 Basic Resources as well as bringing 1 Soulstone for each non-Holy Avenger Holy unit"
const knighttext = "Unlock the [Exemplar Vengers], a cavalry unit which costs 2 Military to deploy and brings back 2 Workers and 1 Basic Resource. In the following week, for each Exemplar Venger deployed, players can get information on an unvisited room in the session once"


const dr = 2
const mil = 0
const rec = 4
//const espc = 8
const gov = 7
let covenantInternal: TreeNode<{desc : string,
  cost : number,
  benefit : string}>[] = [
  { x: dr, y: 0, name: "Recvover the Teachings", dependOn: [], elem: { desc: "", cost: 1, benefit: "+1 Faith/week for Chapel"}},
  { x: dr, y: 1, name: "Divine Right", dependOn: ["Recvover the Teachings"], elem: { desc: "", cost: 1, benefit: "Unlock [Scrutators] which can be used to increase production of a single building by 50% (rounded up) and gain 1 Scrutator. "+preachertext}},
  { x: dr, y: 2, name: "Sacred Sites", dependOn: ["Divine Right"], elem: { desc: "", cost: 1, benefit: "Can upgrade Chapel into [Church], this upgrade costs as much as building a Chapel and doubles weekly Faith production"}},
  { x: dr, y: 3, name: "Champions of the Faith", dependOn: ["Sacred Sites"], elem: { desc: "", cost: 1, benefit: prelateaviciatext + " Also unlocks the [Cathedral of Anointment], which allows PCs to become radiant spirits during their stay in Elysium."}},
  { x: dr, y: 4, name: "Divine Herald", dependOn: ["Champions of the Faith"], elem: { desc: "", cost: 1, benefit: vicarezekiustext + " Also Unlocks the [Throne of Ramatos] a wonder building that improves Heroes and Scrutators"}},
//  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},

  { x: dr+1, y: 2, name: "Priesthood", dependOn: ["Divine Right"], elem: { desc: "", cost: 1, benefit: "Gain +1 Scrutator"}},
  { x: dr+1, y: 3, name: "Mending Prayers", dependOn: ["Priesthood"], elem: { desc: "", cost: 25, benefit: "Once per session per player, if they would receive a minor defeat instead they don't."}},
  { x: dr+1, y: 4, name: "Miraculous Intervention", dependOn: ["Mending Prayers"], elem: { desc: "", cost: 40, benefit: "Mending Prayers benefit also applies to Major Defeats. Unlock the [Shield of Ramatos] wonder building, which further boosts this benefit"}},


  { x: gov, y: 0, name: "Blessed Work", dependOn: [], elem: { desc: "", cost: 7, benefit: "Buildings producing basic resources gain +1 basic resource production/week"}},
  { x: gov-1, y: 1, name: "f", dependOn: ["Blessed Work"], elem: { desc: "", cost: 1, benefit: "Forests gain +2 Wood/week and +2 Wood from adjacency/week. Increase basic resource carrying capacity from games by 1 per hour."}},
  { x: gov, y: 1, name: "q", dependOn: ["Blessed Work"], elem: { desc: "", cost: 1, benefit: "Quarries gain +2 Stone/week and Core Leechers provide +2 Stone/week to Quarries. Increase basic resource carrying capacity from games by 1 per hour."}},
  { x: gov+1, y: 1, name: "m", dependOn: ["Blessed Work"], elem: { desc: "", cost: 1, benefit: "Forges and Scavenging Yards gain +2 metal/week. Increase basic resource carrying capacity from games by 1 per hour."}},
  { x: gov-1, y: 2, name: "f2", dependOn: ["f"], elem: { desc: "", cost: 1, benefit: "Can upgrade Forest into [Sovereign's Woods]. Upgrading costs as much as building a Forest and doubles the output and adjacency bonus gained. It counts as a forest for adjacency."}},
  { x: gov, y: 2, name: "q2", dependOn: ["q"], elem: { desc: "", cost: 1, benefit: "Can upgrade Quarries into [Pits of Spite]. Upgrading costs as much as building a Quarry and doubles the output as well as bonus gained from Core Leechers."}},
  { x: gov+1, y: 2, name: "m2", dependOn: ["m"], elem: { desc: "", cost: 1, benefit: "Can upgrade Forges into [Manufactories]. Upgrading costs as much as building a Forge and doubles the metal output as well as the amount of scrapyards it can support."}},
  { x: gov, y: 3, name: "Heart of Ramatos", dependOn: ["f2","q2","m2"], elem: { desc: "", cost: 1, benefit: "Can build [Heart of Ramatos], a wonder building that enhances the production of all nearby basic resource buildings"}},

//  { x: espc, y: 0, name: "Immoral Acts", dependOn: [], elem: { desc: "In the service of our ultimate goal it sometimes becomes necessary to bend lesser laws... like honesty.", cost: 1, benefit: "Players of at least Rep Rank 2 with Covenant gain access to [Espionage], allowing them to act as Spies while in other games. You can only be a spy for 1 faction at a time and never for the one that the game is for. Basic espionage for Covenant you gain your faction basic resources equal to resources gained divided by playercount instead of gaining any Mindsteel or Infused Wood."}},
//  { x: espc, y: 1, name: "Embedded Agents", dependOn: ["Immoral Acts"], elem: { desc: "", cost: 1, benefit: "While Spying, when you would normally gain Mindsteel or Infused Wood, the Covenant gain 1 Military"}},

  { x: rec, y: 0, name: "Reconnaissance", dependOn: [], elem: { desc: "", cost: 4, benefit: "Unlock [Covenant Scouting], which allows the faction during resource allocation phase to spend 2 Military to Explore a hex adjacent to a conquered one or explored one, revealing the terrain, resources and theme of it. This can be done twice a week."}},
  { x: rec, y: 1, name: "Exploration", dependOn: ["Reconnaissance"], elem: { desc: "", cost: 1, benefit: "Unlock [Expeditions], which allow sending out a squad of units on an Expedition during resource allocation. You can send a single Expedition per week of up to 6 Units. "+footmentext+" Also unlocks [Patrols] allowing GMs to use Covenant units in random encounters, which grant Soulstone when defeated."}},
  { x: rec, y: 2, name: "Rapid Deployment", dependOn: ["Exploration"], elem: { desc: "", cost: 1, benefit: "The first 4 Military spent on Expeditions each week is free. All Covenant get a Free Stride (or other speeds) for half their Speed at the start of combat."}},
  { x: rec+1, y: 2, name: "Expedition Camps", dependOn: ["Exploration"], elem: { desc: "", cost: 1, benefit: "Can construct an [Expedition Camp], a building that provides +2 Expeditions and +2 Scouting for any scouting action within 2 tiles. If the Expedition Camp is fully surrounded by friendly buildings it is automatically scrapped for a recovery of the full cost and without taking a scrapping action"}},
  { x: rec, y: 3, name: "Seek the Divine", dependOn: ["Rapid Deployment"], elem: { desc: "", cost: 1, benefit: "Expeditions have a 10% chance of finding a [Shard of Ramathos], needed for high level research and buildings. Sessions centered around searching for Ramatos can now also give a Shard of Ramatos"}},
  { x: rec, y: 4, name: "Eyes of Ramatos", dependOn: ["Seek the Divine"], elem: { desc: "", cost: 1, benefit: "Allows constructing the [Eyes of Ramatos] a wonder building which reveals all hexes within a radius of 5 and in the same radius any Covenant has Perfect True Seeing, which works like True Seeing but automatically succeeds on all counteract checks against non-perfect effects"}},
  { x: rec+1, y: 5, name: "The Awakening", dependOn: ["Seek the Divine"], elem: { desc: "Special: Requires the construction of at least 3 wonder buildings.", cost: 0, benefit: "Obtain the [Rites of Awakening]"}},
  { x: rec+1, y: 6, name: "Resurrection", dependOn: ["The Awakening"], elem: {desc: "Special: Requires [Rites of Awakening] to have been performed", cost: 0, benefit: "After completing the [Through the Gates of Hell] raid, Ramatos walks among his followers once more"}},

  { x: mil, y: 0, name: "Defenders of the Faith", dependOn: [], elem: { desc: "", cost: 4, benefit: "Unlock [Conquest], allowing the faction to expend military to conquer dungeon hexes. Cost starts at 5 military and doubles for each hex conquered per week that way. (Each such hex needs to either be unclaimed or have the claiming GM agree to it being conquerable this way)"}},
  { x: mil, y: 1, name: "Mandatory Service", dependOn: ["Defenders of the Faith"], elem: { desc: "", cost: 1, benefit: "Barracks require +1 Worker/week and produce +2 Military/week and +1 Faith/week"}},
  { x: mil+1, y: 1, name: "Guided Aim", dependOn: ["Defenders of the Faith"], elem: { desc: "", cost: 1, benefit: longbowmentext}},
  { x: mil+1, y: 2, name: "Horsemanship", dependOn: ["Mandatory Service"], elem: { desc: "", cost: 1, benefit: knighttext}},
  { x: mil, y: 2, name: "Strongholds", dependOn: ["Mandatory Service"], elem: { desc: "", cost: 1, benefit: "Can upgrade Barracks into [Stronghold], this upgrade costs as much as building a Barracks and doubles weekly worker cost and Military production"}},
  { x: mil+1, y: 3, name: "Holy Vanguard", dependOn: ["Strongholds"], elem: { desc: "", cost: 1, benefit: phalanxtext}},
  { x: mil, y: 3, name: "Sword of Ramatos", dependOn: ["Strongholds"], elem: { desc: "", cost: 1, benefit: "Unlock the [Sword of Ramatos] wonder building, which provides enhancements to the military"}},
  { x: mil+1, y: 4, name: "Holy Avengers", dependOn: ["Sword of Ramatos","Champions of the Faith"], elem: { desc: "", cost: 1, benefit: paladintext}},
/*


  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},


  Footmen - 1 military for 2 basic resources
  Holy Avenger / Paladin - 1 soulstone 3 military for 8 basic resources and 1 soulstone for each non-Paladin Holy unit
  Preacher - 1 miliatry 1 faith for 2 basic resources + 1 for each Defender unit
  Phalanx - 3 military for 5 basic resources
  Longbow - 2 military for 2 Workers and players can call in a volley once
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
/*
Thul Tree:
  1. Conquest
  2. Blood
  3. Espionage
  4. Expeditions
  5. Resources (simple)
  => 3 layers
 */
//Unlock [Conquest], allowing the faction to expend military to conquer dungeon hexes. Cost starts at 5 military and doubles for each hex conquered per week that way. (Each such hex needs to either be unclaimed or have the claiming GM agree to it being conquerable this way)
//Unlock [Expeditions], which allow sending out a squad of units on an Expedition during resource allocation. You can send a single Expedition per week of up to 6 Units. "+whiptext+"\n\nAlso unlocks [Patrols] allowing GMs to use Nihilim units in random encounters, which grant Mindsteel when defeated.
/*
  Conquest
    - When Conquering can expend resources to gain blood

Warrior Code
Raiding Parties
Battle Ceremonies
Scouting
Forced March

Blood Sacrifice - Increase blood gain
Desecrate -

Landbreaking
Magmaforge
Chant of Growth

Deep Scout
Outposts - Can build a camp in scouted but unconquered terrain to gain resources based on tile. Sessions in adjacent tiles benefit from +1 Small Cave. Automatically scrapped when 2 buildings are adjacent to it. Can not be built within the influence area of a camp.
 */

/*
Scouting - done
Conquest - done
Wonders
Ancestry Transfer
Expeditions (Patrols) - done
Espionage - done
Victory - done
 */
const pow = 3;
const war = 0;
const raid = 1;
const blood = 2;
const bloodrite = 4;
const tesp = 6;
const terraform = 5;
//const unknown = 7;

const rawpawtext = ""

let thulInternal: TreeNode<{desc : string,
  cost : number,
  benefit : string}>[] = [
  { x: war, y: 0, name: "Warfare", dependOn: [], elem: { desc: "", cost: 1, benefit: "Unlock [Conquest], allowing the faction to expend Military to conquer dungeon hexes. Cost starts at 5 Military and doubles for each hex conquered per week that way. (Each such hex needs to either be unclaimed or have the claiming GM agree to it being conquerable this way)"}},
  { x: war, y: 1, name: "Spoils of War", dependOn: ["Warfare"], elem: { desc: "", cost: 1, benefit: "When conquering a hex it can be exploited for 5 basic resources of any kind or 3 blood. An exploited hex does not provide weekly production for 2 weeks."}},
  { x: war, y: 2, name: "Forced March", dependOn: ["Spoils of War"], elem: { desc: "", cost: 1, benefit: "Reduce the cost increase of additional conquests from 5 to 3"}},

  { x: war+0.5, y: 3, name: "Wonder 1", dependOn: ["Forced March", "r3"], elem: { desc: "", cost: 1, benefit: ""}},

  { x: raid, y: 0, name: "Raiding Parties", dependOn: [], elem: { desc: "", cost: 1, benefit: "Unlock [Expeditions], which allow sending out a squad of units on an Expedition during resource allocation. You can send a single Expedition per week of up to 6 Units. "+rawpawtext+"\n\nAlso unlocks [Patrols] allowing GMs to use Thul units in random encounters, which grant Infused Wood when defeated."}},
  { x: raid, y: 1, name: "", dependOn: ["Raiding Parties"], elem: { desc: "", cost: 1, benefit: "For every 3 units on an Expedition, Scout a hex adjacent to an already conquered hex"}},
  { x: raid, y: 2, name: "r3", dependOn: ["Raiding Parties"], elem: { desc: "", cost: 1, benefit: ""}},

  { x: raid+0.5, y: 3, name: "Wonder 2", dependOn: ["r3","b3"], elem: { desc: "", cost: 1, benefit: ""}},

  { x: blood, y: 0, name: "b", dependOn: [], elem: { desc: "", cost: 1, benefit: "Increase the amount of blood per hour of game by 1"}},
  { x: blood, y: 1, name: "b2", dependOn: ["b"], elem: { desc: "", cost: 1, benefit: "Can upgrade Pillars of Sacrifice into Big Pillars of Sacrifice. Costs twice as much as a Pillar and gives the same amount of blood again as a Pillar of Sacrifice."}},
  { x: blood, y: 2, name: "b3", dependOn: ["b2"], elem: { desc: "", cost: 1, benefit: "Pillars gain +3 blood/week, big Pillars +6 blood/week"}},


  { x: bloodrite, y: 0, name: "br1", dependOn: [], elem: { desc: "", cost: 1, benefit: "At the start of a session may become drained 3 to gain the faction 2 blood if you do not suffer a major defeat during the session. This drained stacks with anything and can not be reduced during the session. The blood is seperate from the hourly blood cap."}},
  { x: bloodrite, y: 1, name: "Bleed on the Divine", dependOn: ["br1"], elem: { desc: "", cost: 1, benefit: "Once per session adventurers with at least Rep 2 with the Thul may ritualistically spread Blood on a hex they are in. Doing so costs 5 Blood from the current game, but transforms the hex into one suited for a Pillar of Sacrifice building."}},
  { x: bloodrite, y: 2, name: "br3", dependOn: ["Bleed on the Divine"], elem: { desc: "", cost: 1, benefit: ""}},

  { x: bloodrite+0.5, y: 3, name: "Wonder 3", dependOn: ["br3","tf3"], elem: { desc: "", cost: 1, benefit: ""}},

  { x: terraform, y: 0, name: "Outpost", dependOn: [], elem: { desc: "", cost: 1, benefit: "Can build an [Outpost], a cheap building that automatically scouts an adjacent hex of choice. Every following week it scouts another adjacent hex to itself."}},
  { x: terraform, y: 1, name: "", dependOn: ["Outpost"], elem: { desc: "", cost: 1, benefit: "When scrapping an Outpost that has stood for at least 1 week, the Thul can change the underlaying terrain to one of Uncorrupted Dungeonstone, Fertile Soil, Dimensionally Unstable or Plentiful Metal. Gain an additional Scrap each week"}},
  { x: terraform, y: 2, name: "tf3", dependOn: ["Outpost"], elem: { desc: "", cost: 1, benefit: ""}},

  { x: terraform+0.5, y: 3, name: "Wonder 4", dependOn: ["tf3","tesp3"], elem: { desc: "", cost: 1, benefit: ""}},

//  { x: unknown+1, y: 1, name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: "Convert Base Resource into other at 5:4 rate"}},
//  { x: unknown+2, y: 1, name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: "Efficiency gains of some sort"}},


  { x: tesp, y: 0, name: "Espionage", dependOn: [], elem: { desc: "", cost: 1, benefit: "Players of at least Rep Rank 2 with Thul gain access to [Espionage], allowing them to act as Spies while in other games. You can only be a spy for 1 faction at a time and never for the one that the game is for. Basic espionage for Thul means you gain 3 Blood for the faction instead of Soulstone/Mindsteel."}},
  { x: tesp, y: 1, name: "", dependOn: ["Espionage"], elem: { desc: "", cost: 1, benefit: "When engaging in Espionage, whenever you would get reputation you may instead gain Thul Reputation"}},
  { x: tesp, y: 2, name: "tesp3", dependOn: ["Espionage"], elem: { desc: "", cost: 1, benefit: "When engaging in Espionage, basic resources equal to the amount earned divided by playercount"}},


  { x: pow, y: 0.05, name: "Rite of Empowerment", dependOn: [], elem: { desc: "SPECIAL: Requires 3 other technologies of the current tier to be researched.", cost: 1, benefit: "+1 to all production for the HQ"}},
  { x: pow, y: 1.05, name: "Rite of Imbuement", dependOn: ["Rite of Empowerment"], elem: { desc: "SPECIAL: Requires 3 other technologies of the current tier to be researched.", cost: 1, benefit: "+1 to all production  (other than weekly blood), +3 blood from Pillars of Sacrifice"}},
  { x: pow, y: 2.05, name: "Rite of Elemental Perfection", dependOn: ["Rite of Imbuement"], elem: { desc: "Perfection is reached when the elemental energies are in a precise balance, always shfiting and changing but always in harmony. SPECIAL: Requires 3 other technologies of the current tier to be researched.", cost: 1, benefit: "+1 to all production, +3 blood from Pillars of Sacrifice"}},
/*
  { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
    { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
    { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
    { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
    { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
    { x: , y: , name: "", dependOn: [], elem: { desc: "", cost: 1, benefit: ""}},
*/
  { x: pow, y: 3.05, name: "Perpetual Renewal", dependOn: ["Rite of Elemental Perfection"], elem: { desc: "", cost: 1, benefit: "Can Scrap any amount of Buildings per week. Scrapping recovers all resources. "}},
  { x: pow, y: 4.05, name: "Eternal Now", dependOn: ["Perpetual Renewal"], elem: { desc: "SPECIAL: Requires 3 technologies of the PREVIOUS tier to be researched", cost: 1, benefit: "After completing the [Murder the Gods and Topple Their Thrones] raid all divine influences are banished from Elysium and with them all stagnancy"}}
]

function fix (x : TreeNode<{desc : string,
  cost : number,
  benefit : string}>)  {
  let elem = {name: x.name, ...x.elem}
  return {...x, elem}
}

function thulfix(y : TreeNode<{desc : string,
  cost : number,
  benefit : string}>) {
  const x = {...y}
  switch(x.y) {
    case 1: x.dependOn.push("Rite of Empowerment")
      break
    case 2: x.dependOn.push("Rite of Imbuement")
      break
    case 3: x.dependOn.push("Rite of Elemental Perfection")
  }
  return x
}

const length_left = 12;
const gain_increase_per_week = 8;
let total_generation = 0;
for(let i = 0; i < length_left; i++) {
  total_generation += gain_increase_per_week * (i+1)
}
console.log("total science prod: "+total_generation)
function printCosts(name : string, techs : TreeNode<{desc : string,
  cost : number,
  benefit : string}>[]) {
  const sumCost = (x : TreeNode<{desc : string,
    cost : number,
    benefit : string}>[]) => x.map(x => x.elem.cost).reduce((prev,cur) => prev+cur,0)

  console.log("------------------------------------------------------")
  console.log(name+" total - len: "+techs.length+", cost: "+sumCost(techs))

  const max = Math.max(...techs.map(x => x.y))
  for(let i = 0; i <= max; i++) {
    const tiertechs = techs.filter(x => Math.floor(x.y) == i)
    console.log(name+" tier "+i+"- len: "+tiertechs.length+", cost: "+sumCost(tiertechs)+", avg: "+(sumCost(tiertechs)/tiertechs.length))
  }
  console.log("------------------------------------------------------")
  const totals : number[] = []
  for(let i = 0; i <= max; i++) {
    totals[i] = techs.filter(x => Math.floor(x.y) == i).length
  }
  let bestOnes: {name : string, value : number, candidate : number[]}[] = []
  function collectBestOnes(name : string, data : {value : number, candidate : number[]}) {
    if(bestOnes.length < 5) {
      bestOnes.push({name,...data})
    }else{
      let changed = false
      for(let i = 0; i < 5; i++) {
        if(Math.abs(total_generation-bestOnes[i].value) > Math.abs(total_generation-data.value)) {
          bestOnes[i] = {name,...data}
          changed = true
          break
        }
      }
      if(changed) {
        bestOnes.sort((a,b) => a.value-b.value)
      }
    }
  }
  function calcCosts(starting : number, nextStep : (prev : number, i : number) => number) {
    const techcost_by_tier : number[] = []
    let cost = starting
    let totalCost = 0
    for(let i = 0; i <= max; i++) {
      techcost_by_tier[i] = cost
      totalCost += cost * totals[i]
      cost = nextStep(cost,i+1)
    }
    return {value:totalCost,candidate:techcost_by_tier}
  }

  for(let starting = 2; starting <= 8; starting++) {
    for(let cutoff = 3; cutoff <= max; cutoff++) {
      for (let increment = 1; increment <= 30; increment++) {
        collectBestOnes("additive, c:"+cutoff+", s:" + starting + ", i:" + increment, calcCosts(starting, (prev,i) => i>cutoff ? prev : prev + increment))
      }
      /*    for(let increment = 1; increment <= 30; increment++) {
            collectBestOnes("mult, s:"+starting+", i:"+increment,calcCosts(starting,prev => prev*(1+increment/10)))
          }*/
      for (let increment = 1; increment <= 30; increment++) {
        collectBestOnes("mult round, c:"+cutoff+", s:" + starting + ", i:" + increment, calcCosts(starting, (prev,i) => i>cutoff ? prev :Math.floor( prev * (1 + increment / 10))))
      }
      for (let increment = 1; increment <= 30; increment++) {
        collectBestOnes("mult roundL, c:"+cutoff+", s:" + starting + ", i:" + increment, calcCosts(starting, (prev, i) => i>cutoff ? prev : Math.floor(starting * Math.pow((1 + increment / 10), i))))
      }
    }
  }
  for(const x in bestOnes) {
    let val = bestOnes[x]
    console.log("CANDIDATE "+val.name+" TOTAL COST: "+val.value)
    for(let i = 0; i <= max; i++) {
      const tiertechs = totals[i]
      console.log("CANDIDATE "+val.name+": "+name+" tier "+i+"- len: "+tiertechs+", cost: "+tiertechs*val.candidate[i]+", avg: "+val.candidate[i])
    }
    console.log("-----------------")
  }
}

function cost_override(newCost : number[]) {
  return function (tech : TreeNode<{desc : string,
    cost : number,
    benefit : string}>) {
    const tech2 = {...tech}
    tech2.elem.cost = tech.elem.cost != 1 ? tech.elem.cost : newCost[Math.floor(tech.y)] ?? 0
    return tech2
  }
}
nihilimInternal = nihilimInternal.map(cost_override([4,6,10,17,28,47,79,79]))
covenantInternal = covenantInternal.map(cost_override([6,9,18,30,51]))
thulInternal = thulInternal.map(cost_override([5,16,30,42,70]))
//other thul options: [

printCosts("nihi",nihilimInternal)
printCosts("cove",covenantInternal)
printCosts("thul",thulInternal)
export const nihilim = nihilimInternal.map(fix)
export const covenant = covenantInternal.map(fix)
export const thul = thulInternal.map(thulfix).map(fix)
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
      Wraith: 1 Military for 1 Worker
      Specter: 2 Military for 2 Workers 1 basic resource
      Atrocitus: 3 Military for 2 Workers 2 Mindsteel
      Prefect: 2 Mindsteel 2 Military for 8 of any basic resource
      Consul: 4 Military 2 Gnosis for any 10 of any resource other than military


  espionage = benefits when helping other factions
    get gnosis when helping another faction, additional when doing other faction objectives
    get military and rep when helping others
    gain additional personal resources

 */

/*
Indoctrination    -
Mystic Focus      -

 */