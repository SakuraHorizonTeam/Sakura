/// <reference path = "../header.ts" /> 
/// <reference path = "./ItemBase.ts" /> 
/// <reference path = "./FoodInfo.ts" /> 

namespace Sakura{
    export class ItemDrinkBase extends ItemBase{
        static getContainerByType(con:string):string|boolean{
            if(con === "tea"){
                return Main.MODID + ".cup";
            }
            else{
                return false;
            }
        }

        constructor(modid:string,type:string,items:FoodInfo[],effects:[string,number,number][][]){
            let arr:string[] = [];
            for(let i:number = 0;i < items.length;i ++){
                arr.push(items[i].getName());
            }
            super(modid,type,1,arr);
            for(let i:number = 0;i < items.length;i ++){
                let item:string = items[i].getName();
                let effectArr:any[] = [];
                for(let j:number = 0;j < effects[i].length;j ++){
                    effectArr.push({
                        "name": effects[i][j][0],
                        "chance": 1.0,
                        "duration": effects[i][j][1],
                        "amplifier": effects[i][j][2]
                    });
                }
                Item.setProperties(item,JSON.stringify({
                    use_animation: "eat",
                    use_duration: 32,
                    food : {
                        nutrition: items[i].getCalories(),
				        saturation_modifier: "supernatural",
				        is_meat: false,
				        using_converts_to: "item_" + ItemDrinkBase.getContainerByType(type),
                        can_always_eat: true,
                        effects : effectArr
                    }
                }));
                Item.setUseAnimation(item,2);
		        Item.setMaxUseDuration(item,32);
            }
        }
    }
}