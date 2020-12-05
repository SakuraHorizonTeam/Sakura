import ModConfig from "../ModConfig/ModConfig";

namespace Sakura{
    export class SakuraTree{
        treeObject:genAPI.Tree;
        constructor(){
            this.treeObject = genAPI.tree({
                leaves:{
                    id:BlockID[ModConfig.MODID + ".sakuraleaves"],
                    data:0
                },
                wood:{
                    id:BlockID[ModConfig.MODID + ".sakura_log"],
                    data:0
                },
                minTreeHeight : 6
            })
        }
    }
}