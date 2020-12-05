import ItemResource from "./ItemResource";
import Config from "../ModConfig/ModConfig"
export class BlockResource extends ItemResource {
    constructor(modelPath: string = __dir__ + "resources/assets/" + Config.MODID + "/models/block/", langPath: string = __dir__ + "resources/assets/" + Config.MODID + "/lang/", config?: any) {
        super(modelPath, langPath, config);
    }
}