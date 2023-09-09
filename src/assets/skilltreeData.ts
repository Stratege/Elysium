import type {TreeNode,Cost} from "../util/types";

export const skillTree: TreeNode<{name : string,
  req : string,
  cost : Cost,
  benefit : string}>[] = [
  {x: 0, y: 0, name:"CG1-1", dependOn:[], elem:{cost: {kind:'Soulstone', amount: 1}, name: "CG1-1", req:"?", benefit:"?"}},
  {x: 20, y: 0, name:"CG1-2", dependOn:[], elem:{cost: {kind:'Soulstone', amount: 1}, name: "CG1-2", req:"?", benefit:"?"}},
  {x: 1, y: 1, name:"CG2", dependOn:["CG1-1","CG1-2"], elem:{cost: {kind:'Soulstone', amount: 1}, name: "CG2", req:"?", benefit:"?"}},
]