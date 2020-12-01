import BlockBase from "./block/BlockBase";
class TestBlock extends BlockBase {
  createBlock(){

  }
}
class Main {
  constructor() {
    new TestBlock("test");
  }
}
//开始运行
new Main();
