import BlockBase from "./block/BlockApplication/BlockBase";
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
  dropForCreate(
    coords:Callback.ItemUseCoordinates,
    Block:number,
    blockData: number, 
    diggingLevel: number, 
    enchant: ToolAPI.EnchantData,
    item: ItemInstance,
    region: BlockSource
  ):[number,number,number][]{
      return []
  }
  dropForSurvival(
    coords:Callback.ItemUseCoordinates,
    Block:number,
    blockData: number, 
    diggingLevel: number, 
    enchant: ToolAPI.EnchantData,
    item: ItemInstance,
    region: BlockSource
  ):[number,number,number][]{
    return [];
  }
}
class Main {
  constructor() {
    new TestBlock("test");
  }
}
//开始运行
new Main();
