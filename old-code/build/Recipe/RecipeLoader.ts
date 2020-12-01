/// <reference path = "../header.ts" /> 

namespace Sakura{
    export class RecipeLoader{
        constructor(){
            Main.itemDictionary.register(
                "cropRice",
                {
                    id : ItemID["sakura.rice"],
                    data : 0
                },
                {
                    id : VanillaItemID.wheat_seeds,
                    data : 0
                }
            );
            Main.itemDictionary.register(
                "cropSeaweed",
                {
                    id : ItemID["sakura.seaweed"],
                    data : 0
                },
                {
                    id : VanillaItemID.dried_kelp,
                    data : 0
                }
            );
            Pot.recipeRegister([
                [{
                    id : ItemID["sakura.black_tea_leaves"],
                    data : 0
                }],
                ["water",200],
                {
                    id : ItemID["sakura.cup"],
                    data : 0
                }
            ],{
                id : ItemID["sakura.black_tea"],
                data : 0,
                count : 1
            });
            
            
        }
    }
}
