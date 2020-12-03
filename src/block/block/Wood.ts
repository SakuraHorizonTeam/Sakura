import BlockUniversal from "../BlockApplication/BlockUniversal"

class Wood extends BlockUniversal{
    
    dropForSurvival(coords: Callback.ItemUseCoordinates, Block: number, blockData: number, diggingLevel: number, enchant: ToolAPI.EnchantData, item: ItemInstance, region: BlockSource): [number, number, number][] {
        return []
    }
    
}