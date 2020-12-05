import Resource from "../Resource/Resource";
import ItemResource from "../ResourceManager/ItemResource";

export default class ItemBase {
    constructor(modid: string, type: string, stack: number, items: string[]) {
        for (let i: number = 0; i < items.length; i++) {
            let item: string = items[i];
            IDRegistry.genItemID(item);
            Item.createItem(item, Resource.itemResource.getLang("en_us")["item." + item + ".name"], {
                name: Resource.itemResource.getTexture(item),
                meta: 0
            }, {
                stack: stack
            });
            Translation.addTranslation(Resource.itemResource.getLang("en_us")["item." + item + ".name"], {
                zh: Resource.itemResource.getLang("zh_cn")["item." + item + ".name"]
            });

            if (Resource.itemResource.hasModel(item)) {
                ModelHelper.loadItemModel(item, -1, ItemResource.removeNamespace(item));
            }
        }
    }
}