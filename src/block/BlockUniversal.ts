import BlockBase from "./BlockBase";

/**
 * 通用的方块抽象类
 * 普通的六面体方块，无gui等特殊属性，主要用于定义普通的石头树木等
 * @export
 * @abstract
 * @class BlockUniversal
 * @extends {BlockBase}
 */
export default abstract class BlockUniversal extends BlockBase {
    constructor(BlackID:string) {
        super(BlackID)
        //创建特殊类型
        this.BlockSpecialTypeID = Block.createSpecialType(this.BlockSpecialType);
    }
    BlockSpecialType:Block.SpecialType;
    BlockSpecialTypeID:number;


}