export function toMap<T>(arr : T[], f : (x : T) => string) : {[key : string] : T} {
  let ret : {[key : string] : T} = {}
  arr.forEach(x => {
    ret[f(x)] = x
  })
  return ret
}