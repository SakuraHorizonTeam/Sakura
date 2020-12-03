import BlockBase from "../BlockApplication/BlockBase";
import BlockImplementBase from "./BlockImplementBase";

class BlockImplementStandard extends BlockImplementBase {
    constructor(blockVariation:Block.BlockVariation[],blockSpecialType:Block.SpecialType){
        super();
        this.blockVariation = blockVariation;
        this.blockSpecialType = blockSpecialType;
    }
    /**
     * 方块的变种信息
     * 
     * @type {Block.BlockVariation[]}
     * @memberOf BlockImplementStandard
     */
    blockVariation:Block.BlockVariation[];
    /**
     * 方块的特殊类型
     * 
     * @type {Block.SpecialType}
     * @memberOf BlockImplementStandard
     */
    blockSpecialType:Block.SpecialType;
    /**
     * 实现createblock方法
     * 
     * @param {BlockBase} that 
     * @returns {boolean} 
     * 
     * @memberOf BlockImplementStandard
     */
    createBlock(that: BlockBase): boolean {
        Block.createBlock(
            that.getID().BlackID,
            this.blockVariation,
            this.blockSpecialType
        );
        return true
    }

}