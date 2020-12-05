declare class ModelHelper{
    static setModelDir(dir, bool?);
    static loadModel(blockID, data, name, params?);
    static loadItemModel(itemID, data, name, params?);
    
}
declare class BlockModel{
    constructor(...any)
    addEntry(...any)
    get()
}