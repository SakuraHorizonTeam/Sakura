//import ItemResource = require("./ResourceManager/ItemResource");
/// <reference path = "./ResourceManager/ItemResource.ts" /> 
/// <reference path = "./ResourceManager/BlockResource.ts" /> 
/// <reference path = "./Item/ItemLoader.ts" /> 
/// <reference path = "./Block/BlockLoader.ts" /> 
/// <reference path = "./Item/ItemDictionary.ts" /> 
/// <reference path = "./Generation/SakuraTree.ts" /> 
/// <reference path = "./TileEntity/Pot.ts" /> 

IMPORT("BlockModelLibs");
IMPORT("genTree");

namespace Sakura{
    //declare class ItemResource;

    export class Main{
        public static readonly MODID:string = "sakura";
        public static readonly NAME:string = "Sakura";
        public static readonly VERSION:number[] = [1,0,0];
        public static readonly GUI_SCALE = 3.2;

        public static itemResource:ItemResource;
        public static blockResource:ItemResource;
        public static itemLoader:ItemLoader;
        public static blockLoader:BlockLoader;
        public static itemDictionary:ItemDictionary.Dictionary;

        public static getVersion():string{
            let str:string = "";
            for(let i:number = 0;i < Main.VERSION.length - 1;i ++){
                str += Main.VERSION[i];
                str += ".";
            }
            str += Main.VERSION[Main.VERSION.length - 1];
            return str;
        }

        public static init():void{
            Callback.addCallback("PostLoaded",function(){
                alert("Welcome to Sakura Pocket Edition " + Main.getVersion());
            });
            Main.itemResource = new ItemResource();
            Main.blockResource = new BlockResource();
            Main.itemDictionary = new ItemDictionary.Dictionary();
            Main.itemLoader = new ItemLoader();
            Main.blockLoader = new BlockLoader();
            Callback.addCallback("PostLoaded",function(){
                new RecipeLoader();
                
                //let set = new Set();
                //set.add(JSON.stringify({a:1}));
                //alert(set.has(JSON.stringify({a:1})));
            });
        }
    }
}

Sakura.Main.init();
