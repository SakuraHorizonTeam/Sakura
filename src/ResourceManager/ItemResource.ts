import Config from "../ModConfig/ModConfig"


export default class ItemResource {
    public readonly modelPath: string;
    public readonly langPath: string;

    constructor(modelPath: string = __dir__ + "resources/assets/" + Config.MODID + "/models/item/", langPath: string = __dir__ + "resources/assets/" + Config.MODID + "/lang/", config?: any) {
        this.modelPath = modelPath;
        this.langPath = langPath;
    }

    //请尽可能使用item的完整id作为参数，以免混乱。如需使用item去除命名空间后的id，请调用本方法。
    public static removeNamespace(itemId: string): string {
        let arr: string[] = itemId.split(".");
        return arr[arr.length - 1];
    }

    getLang(lang: string): any {
        return FileTools.ReadKeyValueFile(this.langPath + lang + ".lang", "=");
    }

    getModel(itemId: string): any {
        return FileTools.ReadJSON(this.modelPath + ItemResource.removeNamespace(itemId) + ".json");
    }

    getTexture(id: string) {
        let model: any = this.getModel(id);
        if (!model.elements) {
            try {
                return model.textures.layer0.split("/")[1];
            }
            catch (e) {
                return ItemResource.removeNamespace(id);
            }
        }
        else {
            return ItemResource.removeNamespace(id);
        }
    }

    hasModel(id: string): boolean {
        let model: any = this.getModel(id);
        try {
            return model.elements || model.parent.split(":")[0] === Config.MODID;
        }
        catch (e) {
            return false;
        }
    }
}
