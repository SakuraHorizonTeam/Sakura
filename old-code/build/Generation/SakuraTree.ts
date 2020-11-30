namespace Sakura{
    export class SakuraTree{
        treeObject:genAPI.Tree;
        constructor(){
            this.treeObject = genAPI.tree({
                leaves:{
                    id:BlockID[Main.MODID + ".sakuraleaves"],
                    data:0
                },
                wood:{
                    id:BlockID[Main.MODID + ".sakura_log"],
                    data:0
                },
                minTreeHeight : 6
            })
        }
    }
}