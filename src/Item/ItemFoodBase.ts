import FoodInfo from "./FoodInfo";
import ItemBase from "./ItemBase";

export class ItemFoodBase extends ItemBase {

    constructor(modid: string, type: string, stack: number, items: FoodInfo[]) {
        let arr: string[] = [];
        for (let i: number = 0; i < items.length; i++) {
            arr.push(items[i].getName());
        }
        super(modid, type, stack, arr);
        for (let i: number = 0; i < items.length; i++) {
            let item: string = items[i].getName();

            Item.setProperties(item, JSON.stringify({
                use_animation: "eat",
                use_duration: 32,
                food: {
                    nutrition: items[i].getCalories(),
                    saturation_modifier: "normal",
                    is_meat: false,
                    can_always_eat: false
                }
            }));
            Item.setUseAnimation(item, 2);
            Item.setMaxUseDuration(item, 32);
        }
    }
}