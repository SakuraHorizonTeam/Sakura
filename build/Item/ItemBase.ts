/// <reference path = "../header.ts" /> 
/// <reference path = "../ResourceManager/ItemResource.ts" /> 

namespace Sakura {
    export class ItemBase{
        constructor(modid:string,type:string,stack:number,items:string[]){
            for(let i:number = 0;i < items.length;i ++){
                let item:string = items[i];
                IDRegistry.genItemID(item);
                Item.createItem(item,Main.itemResource.getLang("en_us")["item." + item + ".name"],{
                    name : Main.itemResource.getTexture(item),
                    meta : 0
                },{
                    stack : stack
                });
                Translation.addTranslation(Main.itemResource.getLang("en_us")["item." + item + ".name"],{
                    zh : Main.itemResource.getLang("zh_cn")["item." + item + ".name"]
                });

                if(Main.itemResource.hasModel(item)){
                    ModelHelper.loadItemModel(item,-1,ItemResource.removeNamespace(item));
                }
            }
        }
    }
}