import deepCompare from "../Tools/deepCompare";
import Item from "./Item"
    export default class ItemGroup{
        private group:Set<Item> = new Set();

        public add(...items:Item[]):ItemGroup{
            for(let i = 0;i < items.length;i  ++){
                this.group.add(items[i]);
            }
            return this;
        }
        
        public size():number{
            return this.group.size;
        }
        
        public has(item:Item):boolean{
            let out = false;
            this.group.forEach(function(v,v1,set){
                if(deepCompare(v,item)){
                    out = true;
                }
            });
            return out;
        }

        public forEach(callbackfn: (value: Item, value2: Item, set: Set<Item>) => void, thisArg?: any):ItemGroup{
            this.group.forEach(callbackfn,thisArg);
            return this;
        }

        constructor(){
            
        }
    }