import BlockBase from "./BlockBase";

/**
 * 通用的方块抽象类
 * 普通的六面体方块，无gui等特殊属性，主要用于定义普通的石头树木矿物等
 * @export
 * @abstract
 * @class BlockUniversal
 * @extends {BlockBase}
 */
export default abstract class BlockUniversal extends BlockBase {
    //创造模式不掉落物品
    dropForCreate(
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