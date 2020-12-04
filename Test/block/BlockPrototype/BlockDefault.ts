import BlockUniversal from "./BlockUniversal"
import BlockImplementBase from "../BlockRander/BlockRanderBase"

export default class BlockDefailt extends BlockUniversal{
  dropForSurvival(coords: Callback.ItemUseCoordinates, Block: number, blockData: number, diggingLevel: number, enchant: ToolAPI.EnchantData, item: ItemInstance, region: BlockSource): [number, number, number][] {
        var item = Player.getCarriedItem();
		    var toolData = ToolAPI.getToolData(item.id);
        Debug.m(toolData);
        return [[Block,10,blockData]]
  }
    
}
