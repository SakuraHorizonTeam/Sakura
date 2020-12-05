export default class LiquidModel{
    private key:string;
    private texture:[string,number][];

    static map:Map<string,LiquidModel> = new Map<string,LiquidModel>();
    constructor(key:string,texture:[string,number][]){
        this.key = key;
        this.texture = texture;
    }
    static register(key:string,texture:[string,number]):LiquidModel{
        let liquid =  new LiquidModel(key,[texture]);
        this.map.set(key,liquid);
        return liquid;
    }
    static getTexture(key:string):[string,number][] | undefined{
        return this.map.get(key)?.texture;
    }
}

LiquidModel.register("water",["water_still",0]);
LiquidModel.register("lava",["lava_still",0]);
LiquidModel.register("milk",["white_bg",0]);
