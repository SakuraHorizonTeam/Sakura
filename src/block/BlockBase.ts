//方块类对象的基类
export default abstract class BlockBase{
  private BlackID:string;
  private ID:number;
  constructor(BlackID:string){
    this.BlackID = BlackID;
    this.ID = IDRegistry.genBlockID(BlackID);
    this.createBlock();
    Block.registerDropFunction(this.BlackID,():[number,number,number][]=>{
      Debug.m(this);
      return []
    });
  }

  //在游戏中创建方块
  abstract createBlock():void;

};
