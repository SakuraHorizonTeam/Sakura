import BlockUniversal from "../blockAbstract/BlockUniversal"

class Wood extends BlockUniversal{
    blockSpecialType: Block.SpecialType = {
        base:17
    };
    blockVariations: Block.BlockVariation[];
    dropForSurvival(coords: Callback.ItemUseCoordinates, Block: number, blockData: number, diggingLevel: number, enchant: ToolAPI.EnchantData, item: ItemInstance, region: BlockSource): [number, number, number][] {
        throw new Error("Method not implemented.");
    }
    
}