namespace Sakura{
    export class BlockResource extends ItemResource{
        constructor(modelPath:string = __dir__ + "resources/assets/" + Main.MODID + "/models/block/",langPath:string = __dir__ + "resources/assets/" + Main.MODID + "/lang/",config?:any){
            super(modelPath,langPath,config);
        }
    }
}