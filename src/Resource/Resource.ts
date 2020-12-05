import { BlockResource } from "../ResourceManager/BlockResource";
import ItemResource from "../ResourceManager/ItemResource";

export default class Resource {
    public static itemResource: ItemResource = new ItemResource();;
    public static blockResource: ItemResource = new BlockResource();
    public static itemDictionary: ItemDictionary.Dictionary  = new ItemDictionary.Dictionary();
}