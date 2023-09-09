import type {TreeNode} from "../util/types";

const nihilimInternal: TreeNode<{req : string,
  cost : number,
  benefit : string}>[] = [
  { x: 0, y: 0, name: "N1", dependOn: [], elem: { req: "", cost: 1, benefit: ""}},
]

export const nihilim = nihilimInternal.map(x => {
  let elem = {name: x.name, ...x.elem}
  let ret = {...x, elem}
  return ret
})

