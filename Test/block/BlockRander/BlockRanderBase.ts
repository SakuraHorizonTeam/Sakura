import BlockBAse from "../BlockPrototype/BlockBase"
/**
 * 方块的实现抽象类，用于定义方块的外观特性
 *
 * @export
 * @abstract
 * @class BlockImplementBase
 */
export default abstract class BlockRanderBase {
    abstract createBlock(that:BlockBAse):boolean;
}
