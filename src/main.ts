import BlockBase from "./block/BlockBase";
class TestBlock extends BlockBase {
  createBlock(){
    Block.createBlock(this.BlackID,[{
      name:"test",
      texture:[
        ["glass",2]
      ],
      inCreative:true
    }])
  }
}
class Main {
  constructor() {
    new TestBlock("test");
  }
}
//开始运行
new Main();
