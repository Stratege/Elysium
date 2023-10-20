
export const completedNihiResearchs = toSet(["Gnosis Principles", "Scientific Approach", "Expectations of High Quality Outcomes via the Use of Logic", "Basic Tactics", "Superior Reflexes", "Gnosis Infused Materials"])
export const completedCoveResearchs = toSet(["Recover the Teachings", "Divine Right"])
export const completedThulResearchs = toSet([])



function toSet(x : string[]) : {[x : string] : boolean} {
  const ret : {[x : string] : boolean} = {}
  x.forEach(x => ret[x] = true)
  return ret
}
/*
dragon's embrace:
  stage 1: +1 to everything but -1 to hit the dragons minions
  stage 2: +2 to everything but -2 to hit the dragons minions
  stage 3: unable to attack the dragons minions, learn the dragon's true name
  stage 4: gain anathema "hindered or failed to further the dragon's agenda when you could have" (aiding is is primarily by offering your blood to others and fighting alongside dragonspawn). You must disclose this level of dragon's embrace in the signup and people are allowed (via 2+ signed up players voting for it) to reject you from the game due to the chance of PvP - this does not apply to games in areas that are known to be free of the dragon's influence
*/