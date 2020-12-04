import BlockImplementBase from "../BlockRander/BlockRanderBase"
/**
 *  所有方块的基类
 *  创建一个新的方块类型，需要继承此方块
 * @export
 * @abstract
 * @class BlockBase
 */
export default abstract class BlockBase{

  /**
   *
   *  方块的字符串id
   * @type {string}
   * @memberof BlockBase
   */
  protected BlackID:string;
  /**
   *
   * 方块的数字id
   * @type {number}
   * @memberof BlockBase
   */
  protected ID:number;

  protected data;
  /**
   * 方块创建的实现类
   * @type {BlockImplementBase}
   * @memberof BlockBase
   */
  impl:BlockImplementBase;
  constructor(BlackID:string,impl:BlockImplementBase,data:{material:string,level:number}={material:"stone",level:0}){
    this.impl = impl;
    this.BlackID = BlackID;
    this.data = data;
    this.ID = IDRegistry.genBlockID(BlackID);
  }

  /**
   * 委托给BlockImplement完成的方块创建
   * @return {*}  {boolean}
   * @memberof BlockBase
   */
  createBlock():boolean{
    let bool:boolean;
    this.impl.createBlock(this)
    ToolAPI.registerBlockMaterial(this.ID, this.data.material);
    Block.setDestroyLevel(this.ID, this.data.level)
    Block.registerDropFunction(this.BlackID,(
      coords:Callback.ItemUseCoordinates,
      Block:number,
      blockData: number, 
      diggingLevel: number, 
      enchant: ToolAPI.EnchantData,
      item: ItemInstance,
      region: BlockSource
      ):[number,number,number][]=>{
      let returnItems =[]
      let res = [];
      
     
      if (Game.getGameMode() === Native.GameMode.CREATIVE) {
        //当模式为创造时
        res = this.dropForCreate(coords,Block,blockData,diggingLevel,enchant,item,region);
      }else{
        //当模式为生存或冒险模式时
        res = this.dropForSurvival(coords,Block,blockData,diggingLevel,enchant,item,region);
      }
      returnItems.push(...res);
      return returnItems;
    });

    this.created();
    
    return bool;
  };

  
  /**
  *  方块创建完毕时调用
  * @return void
  */
  created(){

  };
  /**
   * 获取方块的id
   * @returns {{ID:number,BlackID:string}} 
   * @memberOf BlockBase
   */
  getID():{ID:number,BlackID:string}{
    return {ID:this.ID,BlackID:this.BlackID}
  }

  /**
   *
   * 当创造模式方块被破坏时发生的事情
   * @abstract 
   * @param {Callback.ItemUseCoordinates} coords
   * @param {number} Block
   * @param {number} blockData
   * @param {number} diggingLevel
   * @param {ToolAPI.EnchantData} enchant
   * @param {ItemInstance} item
   * @param {BlockSource} region
   * @return {*}  {[number,number,number][]}
   * @memberof BlockBase
   */
  abstract dropForCreate(
    coords:Callback.ItemUseCoordinates,
    Block:number,
    blockData: number, 
    diggingLevel: number, 
    enchant: ToolAPI.EnchantData,
    item: ItemInstance,
    region: BlockSource):[number,number,number][]

  /**
   *当方块在创造模式被破坏时发生的事情
   *
   * @abstract
   * @param {Callback.ItemUseCoordinates} coords
   * @param {number} Block
   * @param {number} blockData
   * @param {number} diggingLevel
   * @param {ToolAPI.EnchantData} enchant
   * @param {ItemInstance} item
   * @param {BlockSource} region
   * @return {*}  {[number,number,number][]}
   * @memberof BlockBase
   */
  abstract dropForSurvival(
    coords:Callback.ItemUseCoordinates,
    Block:number,
    blockData: number, 
    diggingLevel: number, 
    enchant: ToolAPI.EnchantData,
    item: ItemInstance,
    region: BlockSource):[number,number,number][]
};
