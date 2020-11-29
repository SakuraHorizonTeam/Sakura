/// <reference path = "../header.ts" /> 
/// <reference path = "./ItemBase.ts" /> 
/// <reference path = "./ItemDrinkBase.ts" /> 
/// <reference path = "./ItemFoodBase.ts" /> 
/// <reference path = "./FoodInfo.ts" /> 

namespace Sakura {
    export class ItemLoader{
        constructor(){
            let SakuraMain = Main;
            new ItemBase(SakuraMain.MODID,"materials", 64, [
                SakuraMain.MODID + "." + "straw",//0
                SakuraMain.MODID + "." + "rice",//1
                SakuraMain.MODID + "." + "salt",//2
                SakuraMain.MODID + "." + "curry_powder",//3
                SakuraMain.MODID + "." + "flour",//4
                SakuraMain.MODID + "." + "flour_buckwheat",//5
                SakuraMain.MODID + "." + "dough",//6
                SakuraMain.MODID + "." + "dough_buckwheat",
                SakuraMain.MODID + "." + "ramen_raw",
                SakuraMain.MODID + "." + "udon_raw",
                SakuraMain.MODID + "." + "soba_raw",//10
                SakuraMain.MODID + "." + "curry_sauce",
                SakuraMain.MODID + "." + "tomato_sauce",
                SakuraMain.MODID + "." + "white_sauce",
                SakuraMain.MODID + "." + "tempura_batter",
                SakuraMain.MODID + "." + "chestnut_burrs",//15
                SakuraMain.MODID + "." + "flour_rice",
                SakuraMain.MODID + "." + "dough_rice",//17
                SakuraMain.MODID + "." + "peppercorn_green",
                SakuraMain.MODID + "." + "peppercorn_red",//19
                SakuraMain.MODID + "." + "vanilla_seeds",
                SakuraMain.MODID + "." + "vanilla",//21
                SakuraMain.MODID + "." + "vanilla_roast",
                SakuraMain.MODID + "." + "grape_seeds",//23
                SakuraMain.MODID + "." + "lumber_bamboo",//24
                SakuraMain.MODID + "." + "lumber_sakura",
                SakuraMain.MODID + "." + "lumber_maple",//26
                SakuraMain.MODID + "." + "black_pepper",
                SakuraMain.MODID + "." + "white_pepper",//28
                SakuraMain.MODID + "." + "miso",
                SakuraMain.MODID + "." + "breadcrumbs",//30
                SakuraMain.MODID + "." + "chestnut",//31
                SakuraMain.MODID + "." + "noodle_soup",//32
                SakuraMain.MODID + "." + "soysause",//33
                SakuraMain.MODID + "." + "seaweed",//34
                SakuraMain.MODID + "." + "alkaline",//35
                SakuraMain.MODID + "." + "yeast",//36
                SakuraMain.MODID + "." + "hop",//37
                SakuraMain.MODID + "." + "brown_rice",//38
                SakuraMain.MODID + "." + "green_tea_leaves",//39
                SakuraMain.MODID + "." + "black_tea_leaves",//40
                SakuraMain.MODID + "." + "earl_grey_leaves",//41
                SakuraMain.MODID + "." + "fruit_tea_leaves",//42
                SakuraMain.MODID + "." + "mocha",//43
                SakuraMain.MODID + "." + "rice_tea_leaves",//44
                SakuraMain.MODID + "." + "mint",//45
                SakuraMain.MODID + "." + "mint_tea_leaves",//46
                SakuraMain.MODID + "." + "empty_bottle",//47
                SakuraMain.MODID + "." + "bamboo_sunburnt",//48
                SakuraMain.MODID + "." + "maple_syrup",//49
                SakuraMain.MODID + "." + "coin",//50
                SakuraMain.MODID + "." + "bamboo_charcoal",//51

                SakuraMain.MODID + "." + "zuku",//52
                SakuraMain.MODID + "." + "zuku_ingot",//53
                SakuraMain.MODID + "." + "sagegane",//54
                SakuraMain.MODID + "." + "tamahagane",//55
                SakuraMain.MODID + "." + "steel_ingot",//56
                SakuraMain.MODID + "." + "pasta_raw",//57
            ]);
            new ItemBase(SakuraMain.MODID,"materials", 32, [
                SakuraMain.MODID + "." + "cup"
            ]);
            new ItemFoodBase(SakuraMain.MODID,"foodset", 64,
           [
        		new FoodInfo(SakuraMain.MODID + "." + "grape", 1, 0.25, false, 4, 0.25, 0, 0, 0.5, 0, 5, 0, -1),  
        		new FoodInfo(SakuraMain.MODID + "." + "maple_cookie", 3, 0.25, false, 0.75, 1, 0.1, 0, 0, 0.2, 0.8, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "rice_bread", 5, 0.6, false, 0, 1.5, 0.5, 0, 0, 0, 0.8, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "red_bean_paste", 4, 0.25, false, 4, 0.25, 0, 0, 0.5, 0, 4, 0, -1),  
        		new FoodInfo(SakuraMain.MODID + "." + "bun", 5, 0.6, false, 0, 1.5, 0.1, 0, 0, 0.2, 0.8, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "cheese", 2, 0.2, false, 3, 0, 2.5, 2, 0, 2, 2, 0, -1),	
        		new FoodInfo(SakuraMain.MODID + "." + "katsu", 9, 0.6, false, 4, 0.25, 2, 1, 0, 0.5, 1.25, 0, -1),  
        		new FoodInfo(SakuraMain.MODID + "." + "rice_cooked", 4, 0.5, false, 0.5, 1.5, 0, 0, 0, 0, 2, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "rice_bamboo", 5, 0.6, false, 0.5, 1.5, 0, 0, 1, 0, 2.25, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "rice_fish", 7, 0.7, false, 0.5, 1.5, 0, 2, 0, 0.5, 2.25, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "rice_beef", 9, 0.8, false, 0.5, 1.5, 2, 2.5, 0, 0.5, 2.25, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "rice_pork", 7, 0.7, false, 0.5, 1.5, 2, 2.5, 0, 0.5, 2.25, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "rice_mushroom", 6, 0.6, false, 0.5, 1.5, 0, 1, 0, 1, 2, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "rice_egg", 5, 0.6, false, 0.5, 1.5, 0.5, 1, 0, 1, 2.25, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "rice_beef_egg", 10, 1, false, 0.5, 1.5, 2.5, 3.5, 0, 1.5, 2.25, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "rice_pork_egg", 9, 0.8, false, 0.5, 1.5, 2.5, 3.5, 0, 1.5, 2.25, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "rice_pork_fried", 10, 1, false, 0.5, 2, 4, 4, 0, 1, 2.25, 1, 480),	
        		new FoodInfo(SakuraMain.MODID + "." + "rice_oyako", 9, 0.8, false, 0.5, 1.5, 2, 2.5, 0, 0.5, 2.25, 1, 480),	
        		new FoodInfo(SakuraMain.MODID + "." + "rice_oyako_fish", 9, 0.8, false, 0.5, 1.5, 2, 2.5, 0, 1.5, 2.25, 1, 480),	
        		new FoodInfo(SakuraMain.MODID + "." + "ramen", 4, 0.5, false, 35, 1.5, 0, 0, 0, 0, 4, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "ramen_beef", 9, 0.8, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "ramen_egg", 5, 0.6, false, 35, 1.5, 0.5, 1, 0, 1, 5, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "ramen_tempura", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "ramen_friedtofu", 9, 0.7, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "ramen_katsu", 10, 0.8, false, 35, 2, 4, 4, 0, 1, 5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "ramen_large", 12, 1, false, 35, 2, 4, 4, 2, 2, 5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "udon", 4, 0.5, false, 35, 1.5, 0, 0, 0, 0, 4, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "udon_beef", 9, 0.8, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "udon_egg", 5, 0.6, false, 35, 1.5, 0.5, 1, 0, 1, 5, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "udon_tempura", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "udon_friedtofu", 9, 0.7, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "udon_katsu", 10, 0.8, false, 35, 2, 4, 4, 0, 1, 5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "udon_large", 12, 1, false, 35, 2, 4, 4, 2, 2, 5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "yaki_udon", 9, 0.7, false, 2.5, 1.5, 1.5, 2.5, 1, 0.5, 3.5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "soba", 4, 0.5, false, 35, 1.5, 0, 0, 0, 0, 4, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "soba_beef", 9, 0.8, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "soba_egg", 5, 0.6, false, 35, 1.5, 0.5, 1, 0, 1, 5, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "soba_tempura", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "soba_friedtofu", 9, 0.7, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "soba_katsu", 10, 0.8, false, 35, 2, 4, 4, 0, 1, 5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "soba_large", 12, 1, false, 35, 2, 4, 4, 2, 2, 5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "soba_zaru", 6, 0.7, false, 5, 2, 0, 0.5, 0, 0.5, 3.5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "onigiri", 6, 0.6, false, 0.5, 1.5, 0, 0, 0.5, 0.5, 2, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "onigiri_bamboo", 7, 0.7, false, 0.5, 1.5, 0, 0, 1.5, 0.5, 2.25, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "onigiri_fish", 8, 0.7, false, 0.5, 1.5, 0, 2, 0.5, 1, 2.25, 1, 480), 
        		new FoodInfo(SakuraMain.MODID + "." + "onigiri_mushroom", 7, 0.7, false, 0.5, 1.5, 0, 0, 0, 0.5, 2, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "onigiri_seaweed", 7, 0.7, false, 0.5, 1.5, 0, 0, 1, 1, 2.25, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "onigiri_tempura", 10, 0.8, false, 0.5, 1.5, 2, 3, 0.5, 1, 2.25, 1, 480), 
        		new FoodInfo(SakuraMain.MODID + "." + "burger_raw", 2, 0.2, false, 1, 0, 2, 2.5, 0, 0, 2, 1, 200),         
        		new FoodInfo(SakuraMain.MODID + "." + "burger", 6, 0.6, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "burger_dish", 10, 0.8, false, 2.5, 1, 2, 3, 1, 1, 2.5, 1, 480), 
        		new FoodInfo(SakuraMain.MODID + "." + "rice_curry", 6, 0.6, false, 0.5, 1.5, 1, 1, 1, 0.5, 2.25, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "rice_curry_katsu", 10, 0.8, false, 0.5, 2, 3, 3, 1, 1.5, 2.25, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "rice_curry_burger", 10, 0.8, false, 0.5, 2, 3, 3, 1, 1.5, 2.25, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "rice_curry_cheese", 8, 0.8, false, 0.5, 1.5, 2, 2, 1, 1.5, 2.25, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "rice_curry_cheese_katsu", 12, 0.8, false, 0.5, 2, 3, 4, 1, 2.5, 2.25, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "rice_curry_cheese_burger", 12, 0.8, false, 0.5, 2, 3, 4, 1, 2.5, 2.25, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "mashed_potato", 5, 0.6, false, 0.5, 2, 0, 0, 2, 0.5, 4, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "mochi", 2, 0.5, false, 0.5, 2, 0, 0, 0, 0, 2, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "mochi_toasted", 4, 0.6, false, 0.5, 2, 0, 0, 0, 0, 1.5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "mochi_sakura", 4, 0.6, false, 0.5, 2, 0, 0, 1, 0.5, 2, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "ohagi", 6, 0.6, false, 0.5, 3, 0.5, 0, 0, 0.5, 2.25, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "croquette", 6, 0.6, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "natto", 2, 0.5, false, 0.5, 1, 0.5, 2, 0, 0.5, 2, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "rice_natto", 5, 0.6, false, 0.5, 2.5, 0.5, 2, 0, 1, 2.25, 1, 480),     
        		new FoodInfo(SakuraMain.MODID + "." + "rice_natto_egg", 6, 0.6, false, 0.5, 2.5, 1, 3, 0, 1.5, 2.25, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "nikujaga", 8, 0.6, false, 0.5, 1, 2, 3, 1, 1, 3, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "omurice", 8, 0.6, false, 0.5, 2, 3, 4, 2, 2, 2.5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "rice_fried", 8, 0.6, false, 0.5, 1.5, 2, 2, 2, 2, 2.5, 1, 480), 
        		new FoodInfo(SakuraMain.MODID + "." + "hamburger", 8, 0.6, false, 0.5, 2, 2, 4, 0, 0.5, 3, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "cheese_burger", 10, 0.8, false, 0.5, 2.5, 2.5, 5, 0, 1, 3, 1, 480),     
        		new FoodInfo(SakuraMain.MODID + "." + "mabodofu", 8, 0.6, false, 1, 1, 2, 3, 1, 1, 4, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "maboqiezi", 8, 0.6, false, 1, 1, 1, 3, 2, 1, 4, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "chestnut_toasted", 4, 0.4, false, 0.5, 2, 0, 0, 1, 0, 2.5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "soup_red_bean", 6, 0.6, false, 5, 2, 2, 2, 2, 2, 5, 0, 0), 
        		new FoodInfo(SakuraMain.MODID + "." + "pound_cake", 5, 0.6, false, 0.5, 4, 1, 2, 1, 1, 3, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "osuimono", 4, 0.5, false, 50, 0, 0, 0, 0, 1, 5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "ochazuke", 6, 0.6, false, 50, 0, 0, 2, 0, 2, 5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "shrimp", 2, 0.6, false, 0.5, 0, 0, 2, 0, 0.5, 2, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "tempura", 5, 0.6, false, 0, 1, 1, 2, 0, 0.5, 1.5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "fishcake", 4, 0.6, false, 1, 2, 1, 2.5, 0, 1, 1.5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "tofu", 2, 0.4, false, 0.5, 0, 0, 2, 0, 0.5, 3, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "tofu_fried", 4, 0.5, false, 0.5, 0.5, 1, 2, 0, 0.5, 2, 1, 480),     
        		new FoodInfo(SakuraMain.MODID + "." + "oden", 8, 0.6, false, 1, 1, 2, 3, 1, 1, 4, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "dananko", 6, 0.6, false, 1, 3, 1, 0, 0, 1, 2, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "danmitarashi", 6, 0.4, false, 1, 3, 1, 0, 0, 1, 2, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "dansansyoku", 6, 0.6, false, 1, 3, 1, 0, 0, 1, 2, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "eggplant_baked", 4, 0.5, false, 1, 0, 0, 0, 2, 0.5, 3, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "fried_chicken", 6, 0.6, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "sashimi", 6, 0.6, false, 1, 0, 0, 3, 0, 1, 4, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "beef_stick", 8, 0.8, false,2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "chicken_stick", 6, 0.4, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "pork_stick", 6, 0.6, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "ramen_croquette", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),       
        		new FoodInfo(SakuraMain.MODID + "." + "udon_croquette", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),        
        		new FoodInfo(SakuraMain.MODID + "." + "soba_croquette", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),       
        		new FoodInfo(SakuraMain.MODID + "." + "ramen_chicken", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),     
        		new FoodInfo(SakuraMain.MODID + "." + "udon_chicken", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),            
        		new FoodInfo(SakuraMain.MODID + "." + "soba_chicken", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),    
        		new FoodInfo(SakuraMain.MODID + "." + "tamagoyaki", 6, 0.6, false, 0.5, 0.5, 1, 2, 0, 0.5, 3, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "sushi", 5, 0.6, false, 1, 1, 0, 2, 0, 1, 4, 1, 480),     
        		new FoodInfo(SakuraMain.MODID + "." + "sushi_tamago", 4, 0.6, false, 1, 1, 1, 2, 0, 1, 4, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "ehoumaki", 8, 0.6, false, 1, 2, 1, 3, 2, 1, 4, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "pudding", 4, 0.4, false, 2, 2, 1, 2, 0, 0, 2.5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "pudding_maple", 6, 0.6, false, 2, 3, 2, 2, 0, 0, 2.5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "rice_redbean", 6, 0.6, false, 0.5, 4, 1, 0, 0, 0.5, 3, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "fish_bake", 8, 0.8, false, 0.5, 0.5, 0.5, 3, 0, 1, 3, 1, 480),     
        		new FoodInfo(SakuraMain.MODID + "." + "fries", 5, 0.6, false, 1, 2, 2, 0, 1, 1, 1, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "furofuki_daikon", 5, 0.6, false, 25, 1, 0, 2, 4, 1, 5, 1, 480),  
        		new FoodInfo(SakuraMain.MODID + "." + "cabbage_roll", 4, 0.4, false, 25, 1, 0, 2, 4, 1, 5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "white_stew", 6, 0.6, false, 35, 2, 2, 2, 2, 2, 5, 0, 0), 
        		new FoodInfo(SakuraMain.MODID + "." + "fruitsalad", 6, 0.6, false, 15, 2, 0, 0, 4, 0.5, 5.5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "raw_taiyaki", 2, 0.2, false, 0.5, 0.5, 0.5, 0, 0, 0, 2, 1, 480),     
        		new FoodInfo(SakuraMain.MODID + "." + "taiyaki", 6, 0.6, false, 0.5, 4, 2, 3, 0, 0, 1, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "lemon",  1, 0.1, false, 5, 0, 0, 0, 1, 0, 3.5, 1, 480),     
        		new FoodInfo(SakuraMain.MODID + "." + "lemon_juice",  1, 0.1, false, 40, 0, 0, 2, 0, 0, 5, 0, 0),            
        		new FoodInfo(SakuraMain.MODID + "." + "soda_water", 1, 0.1, false, 50, 0, 0, 0, 0, 0, 5, 0, 0), 
        		new FoodInfo(SakuraMain.MODID + "." + "almond", 1, 0.1, false, 0, 0, 2, 0, 0, 0, 2, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "blackcurrant_juice", 1, 0.1, false, 40, 0, 0, 2, 0, 0, 5, 0, 0),     
        		new FoodInfo(SakuraMain.MODID + "." + "orange_juice", 1, 0.1, false, 40, 0, 0, 2, 0, 0, 5, 0, 0),     
        		new FoodInfo(SakuraMain.MODID + "." + "grape_green", 2, 0.2, false, 4, 0.25, 0, 0, 0.5, 0, 5, 0, 0),  
        		new FoodInfo(SakuraMain.MODID + "." + "sliced_cabbage", 2, 0.2, false, 5, 0, 0, 0, 1, 0, 2.5, 1, 480),         
        		new FoodInfo(SakuraMain.MODID + "." + "sushi_shrimp", 5, 0.6, false, 1, 1, 0, 2, 0, 1, 4, 1, 480),     
        		new FoodInfo(SakuraMain.MODID + "." + "curry_omurice", 8, 0.6, false, 0.5, 2, 2, 4, 0, 0.5, 3, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "katsu_dish", 10, 0.8, false, 0.5, 2.5, 2.5, 5, 0, 1, 3, 1, 480),     
        		new FoodInfo(SakuraMain.MODID + "." + "croquette_dish", 8, 0.6, false, 1, 1, 2, 3, 1, 1, 4, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "pasta_tomato", 9, 0.8, false, 5, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480), 
        		new FoodInfo(SakuraMain.MODID + "." + "pasta_mushroom", 9, 0.8, false, 5, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),        
        		new FoodInfo(SakuraMain.MODID + "." + "pasta_whitesauce", 9, 0.8, false, 5, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
        		new FoodInfo(SakuraMain.MODID + "." + "egg_soft", 2, 0.6, false, 1, 2.0, 2.0, 1.5, 0.0, 1.0, 2, 1, 480), 
        		new FoodInfo(SakuraMain.MODID + "." + "egg_soysauce", 4, 0.6, false, 1, 2.0, 2.0, 2, 0.0, 1.5, 1.0, 1, 480), 
           ]
    );
            new ItemDrinkBase(SakuraMain.MODID,"tea",[
                new FoodInfo(SakuraMain.MODID + "." +"black_tea", 1, 0.5, false, 50, 0, 0, 0, 1, 0, 5, 0, 0),
							  new FoodInfo(SakuraMain.MODID + "." +"green_tea", 1, 0.5, false, 50, 0, 0, 0, 1, 0, 5, 0, 0),		
							  new FoodInfo(SakuraMain.MODID + "." +"milk_tea", 1, 0.5, false, 50, 0, 1, 2, 1, 0, 5, 0, 0),
							  new FoodInfo(SakuraMain.MODID + "." +"milk_green_tea", 1, 0.5, false, 50, 0, 1, 2, 1, 0, 5, 0, 0),
							  new FoodInfo(SakuraMain.MODID + "." +"earl_grey", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
							  new FoodInfo(SakuraMain.MODID + "." +"milk_earl_grey", 1, 0.5, false, 50, 0, 1, 2, 2, 0, 5, 0, 0),		
							  new FoodInfo(SakuraMain.MODID + "." +"fruit_tea", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
							  new FoodInfo(SakuraMain.MODID + "." +"milk_fruit_tea", 1, 0.5, false, 50, 0, 1, 2, 2, 0, 5, 0, 0),
							  new FoodInfo(SakuraMain.MODID + "." +"lemon_black_tea", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
							  new FoodInfo(SakuraMain.MODID + "." +"lemon_green_tea", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
							  new FoodInfo(SakuraMain.MODID + "." +"mint_tea", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),		
							  new FoodInfo(SakuraMain.MODID + "." +"barley_tea", 1, 0.5, false, 50, 1, 0, 0, 1, 0, 5, 0, 0),
							  new FoodInfo(SakuraMain.MODID + "." +"brown_rice_tea", 1, 0.5, false, 50, 1, 0, 0, 1, 0, 5, 0, 0),
            ],[
                [["instant_health", 1, 0]],
                [["haste", 600, 0]],
                [["instant_health", 1, 0],["regeneration", 200, 0]],
                [["haste", 600, 0],["regeneration", 200, 0]],
                [["water_breathing", 600, 0]],
                [["water_breathing", 1200, 1]],
                [["jump_boost", 600, 0]],
                [["jump_boost", 600, 0],["regeneration", 200, 0]],
                [["instant_health", 1, 0],["speed", 400, 0]],
                [["haste", 600, 0],["speed", 400, 0]],
                [["night_vision", 600, 0]],
                [["resistance", 600, 0]],
                [["resistance", 600, 0]]
			]);
			
			
        }
    }
}
