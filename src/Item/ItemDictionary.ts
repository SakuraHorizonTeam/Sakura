import ItemGroup from "./ItemGroup";
import Item from "./Item"


export class Dictionary {//单例
    private dict: Map<string, ItemGroup> = new Map<string, ItemGroup>();

    register(groupName: string, ...items: Item[]) {
        if (this.dict.has(groupName)) {
            this.dict.get(groupName)?.add(...items);
        }
        else {
            this.dict.set(groupName, new ItemGroup());
            this.register(groupName, ...items);
        }
    }

    getGroup(groupName: string): any {
        return this.dict.get(groupName);
    }

    hasGroup(groupName: string): boolean {
        return this.dict.has(groupName);
    }

    deleteGroup(groupName: string): Dictionary {
        if (this.hasGroup(groupName)) {
            this.dict.delete(groupName);
        }
        return this;
    }

    getGroupByItem(item: Item): ItemGroup[] {
        let arr: ItemGroup[] = [];
        this.dict.forEach(function (value: ItemGroup, key: string, map: Map<string, ItemGroup>) {
            if (value.has(item)) {
                arr.push(value);
            }
        });

        return arr;
    }

    groupHasItem(groupName: string, item: Item): boolean | undefined {
        if (this.dict.has(groupName)) {
            return this.dict.get(groupName)?.has(item);
        }
        else {
            return undefined;
        }
    }

    groupForeach(groupName: string, callbackfn: (value: Item, value2: Item, set: Set<Item>) => void, thisArg?: any): Dictionary {
        this.getGroup(groupName)?.forEach(callbackfn, thisArg);
        return this;
    }

    constructor() {

    }
}