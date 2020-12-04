import BlockDefault from "./block/BlockPrototype/BlockDefault";
import Rander from "./block/BlockRander/BlockRanderStandard";
class Main {
  constructor() {
    let test = new BlockDefault("test",new Rander([{
      name:"test1",
      texture:[
        ["stone",1]
      ],
      inCreative:true
    }],{
      sound:"wood"
    }))
    test.createBlock();
    
  }
}
//开始运行
new Main();
