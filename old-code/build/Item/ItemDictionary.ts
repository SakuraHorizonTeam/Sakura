namespace ItemDictionary{
    export interface Item{
        id:number,
        data:number
    }

    export function compareItem(a:Item,b:Item):number{
        if(a.id !== b.id){
            return a.id - b.id;
        }
        else{
            return a.data - b.data;
        }
    }

    export class ItemGroup{
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
                if(Sakura.deepCompare(v,item)){
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
    export class Dictionary{//单例
        private dict:Map<string,ItemGroup> = new Map<string,ItemGroup>();

        register(groupName:string,...items:Item[]){
            if(this.dict.has(groupName)){
                this.dict.get(groupName)?.add(...items);
            }
            else{
                this.dict.set(groupName,new ItemGroup());
                this.register(groupName,...items);
            }
        }

        getGroup(groupName:string):any{
            return this.dict.get(groupName);
        }

        hasGroup(groupName:string):boolean{
            return this.dict.has(groupName);
        }

        deleteGroup(groupName:string):Dictionary{
            if(this.hasGroup(groupName)){
                this.dict.delete(groupName);
            }
            return this;
        }

        getGroupByItem(item:Item):ItemGroup[]{
            let arr:ItemGroup[] = [];
            this.dict.forEach(function(value:ItemGroup,key:string,map:Map<string,ItemGroup>){
                if(value.has(item)){
                    arr.push(value);
                }
            });

            return arr;
        }

        groupHasItem(groupName:string,item:Item):boolean|undefined{
            if(this.dict.has(groupName)){
                return this.dict.get(groupName)?.has(item);
            }
            else{
                return undefined;
            }
        }

        groupForeach(groupName:string,callbackfn: (value: Item, value2: Item, set: Set<Item>) => void, thisArg?: any):Dictionary{
            this.getGroup(groupName)?.forEach(callbackfn,thisArg);
            return this;
        }

        constructor(){

        }
    }
}