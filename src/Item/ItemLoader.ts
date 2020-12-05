import ModConfig from "../ModConfig/ModConfig"
import FoodInfo from "./FoodInfo";
import ItemBase from "./ItemBase";
import ItemDrinkBase from "./ItemDrinkBase";
import { ItemFoodBase } from "./ItemFoodBase";
export default class ItemLoader {
	constructor() {
		new ItemBase(ModConfig.MODID, "materials", 64, [
			ModConfig.MODID + "." + "straw",//0
			ModConfig.MODID + "." + "rice",//1
			ModConfig.MODID + "." + "salt",//2
			ModConfig.MODID + "." + "curry_powder",//3
			ModConfig.MODID + "." + "flour",//4
			ModConfig.MODID + "." + "flour_buckwheat",//5
			ModConfig.MODID + "." + "dough",//6
			ModConfig.MODID + "." + "dough_buckwheat",
			ModConfig.MODID + "." + "ramen_raw",
			ModConfig.MODID + "." + "udon_raw",
			ModConfig.MODID + "." + "soba_raw",//10
			ModConfig.MODID + "." + "curry_sauce",
			ModConfig.MODID + "." + "tomato_sauce",
			ModConfig.MODID + "." + "white_sauce",
			ModConfig.MODID + "." + "tempura_batter",
			ModConfig.MODID + "." + "chestnut_burrs",//15
			ModConfig.MODID + "." + "flour_rice",
			ModConfig.MODID + "." + "dough_rice",//17
			ModConfig.MODID + "." + "peppercorn_green",
			ModConfig.MODID + "." + "peppercorn_red",//19
			ModConfig.MODID + "." + "vanilla_seeds",
			ModConfig.MODID + "." + "vanilla",//21
			ModConfig.MODID + "." + "vanilla_roast",
			ModConfig.MODID + "." + "grape_seeds",//23
			ModConfig.MODID + "." + "lumber_bamboo",//24
			ModConfig.MODID + "." + "lumber_sakura",
			ModConfig.MODID + "." + "lumber_maple",//26
			ModConfig.MODID + "." + "black_pepper",
			ModConfig.MODID + "." + "white_pepper",//28
			ModConfig.MODID + "." + "miso",
			ModConfig.MODID + "." + "breadcrumbs",//30
			ModConfig.MODID + "." + "chestnut",//31
			ModConfig.MODID + "." + "noodle_soup",//32
			ModConfig.MODID + "." + "soysause",//33
			ModConfig.MODID + "." + "seaweed",//34
			ModConfig.MODID + "." + "alkaline",//35
			ModConfig.MODID + "." + "yeast",//36
			ModConfig.MODID + "." + "hop",//37
			ModConfig.MODID + "." + "brown_rice",//38
			ModConfig.MODID + "." + "green_tea_leaves",//39
			ModConfig.MODID + "." + "black_tea_leaves",//40
			ModConfig.MODID + "." + "earl_grey_leaves",//41
			ModConfig.MODID + "." + "fruit_tea_leaves",//42
			ModConfig.MODID + "." + "mocha",//43
			ModConfig.MODID + "." + "rice_tea_leaves",//44
			ModConfig.MODID + "." + "mint",//45
			ModConfig.MODID + "." + "mint_tea_leaves",//46
			ModConfig.MODID + "." + "empty_bottle",//47
			ModConfig.MODID + "." + "bamboo_sunburnt",//48
			ModConfig.MODID + "." + "maple_syrup",//49
			ModConfig.MODID + "." + "coin",//50
			ModConfig.MODID + "." + "bamboo_charcoal",//51

			ModConfig.MODID + "." + "zuku",//52
			ModConfig.MODID + "." + "zuku_ingot",//53
			ModConfig.MODID + "." + "sagegane",//54
			ModConfig.MODID + "." + "tamahagane",//55
			ModConfig.MODID + "." + "steel_ingot",//56
			ModConfig.MODID + "." + "pasta_raw",//57
		]);
		new ItemBase(ModConfig.MODID, "materials", 32, [
			ModConfig.MODID + "." + "cup"
		]);
		new ItemFoodBase(ModConfig.MODID, "foodset", 64,
			[
				new FoodInfo(ModConfig.MODID + "." + "grape", 1, 0.25, false, 4, 0.25, 0, 0, 0.5, 0, 5, 0, -1),
				new FoodInfo(ModConfig.MODID + "." + "maple_cookie", 3, 0.25, false, 0.75, 1, 0.1, 0, 0, 0.2, 0.8, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_bread", 5, 0.6, false, 0, 1.5, 0.5, 0, 0, 0, 0.8, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "red_bean_paste", 4, 0.25, false, 4, 0.25, 0, 0, 0.5, 0, 4, 0, -1),
				new FoodInfo(ModConfig.MODID + "." + "bun", 5, 0.6, false, 0, 1.5, 0.1, 0, 0, 0.2, 0.8, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "cheese", 2, 0.2, false, 3, 0, 2.5, 2, 0, 2, 2, 0, -1),
				new FoodInfo(ModConfig.MODID + "." + "katsu", 9, 0.6, false, 4, 0.25, 2, 1, 0, 0.5, 1.25, 0, -1),
				new FoodInfo(ModConfig.MODID + "." + "rice_cooked", 4, 0.5, false, 0.5, 1.5, 0, 0, 0, 0, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_bamboo", 5, 0.6, false, 0.5, 1.5, 0, 0, 1, 0, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_fish", 7, 0.7, false, 0.5, 1.5, 0, 2, 0, 0.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_beef", 9, 0.8, false, 0.5, 1.5, 2, 2.5, 0, 0.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_pork", 7, 0.7, false, 0.5, 1.5, 2, 2.5, 0, 0.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_mushroom", 6, 0.6, false, 0.5, 1.5, 0, 1, 0, 1, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_egg", 5, 0.6, false, 0.5, 1.5, 0.5, 1, 0, 1, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_beef_egg", 10, 1, false, 0.5, 1.5, 2.5, 3.5, 0, 1.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_pork_egg", 9, 0.8, false, 0.5, 1.5, 2.5, 3.5, 0, 1.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_pork_fried", 10, 1, false, 0.5, 2, 4, 4, 0, 1, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_oyako", 9, 0.8, false, 0.5, 1.5, 2, 2.5, 0, 0.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_oyako_fish", 9, 0.8, false, 0.5, 1.5, 2, 2.5, 0, 1.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "ramen", 4, 0.5, false, 35, 1.5, 0, 0, 0, 0, 4, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "ramen_beef", 9, 0.8, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "ramen_egg", 5, 0.6, false, 35, 1.5, 0.5, 1, 0, 1, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "ramen_tempura", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "ramen_friedtofu", 9, 0.7, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "ramen_katsu", 10, 0.8, false, 35, 2, 4, 4, 0, 1, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "ramen_large", 12, 1, false, 35, 2, 4, 4, 2, 2, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "udon", 4, 0.5, false, 35, 1.5, 0, 0, 0, 0, 4, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "udon_beef", 9, 0.8, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "udon_egg", 5, 0.6, false, 35, 1.5, 0.5, 1, 0, 1, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "udon_tempura", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "udon_friedtofu", 9, 0.7, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "udon_katsu", 10, 0.8, false, 35, 2, 4, 4, 0, 1, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "udon_large", 12, 1, false, 35, 2, 4, 4, 2, 2, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "yaki_udon", 9, 0.7, false, 2.5, 1.5, 1.5, 2.5, 1, 0.5, 3.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "soba", 4, 0.5, false, 35, 1.5, 0, 0, 0, 0, 4, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "soba_beef", 9, 0.8, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "soba_egg", 5, 0.6, false, 35, 1.5, 0.5, 1, 0, 1, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "soba_tempura", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "soba_friedtofu", 9, 0.7, false, 35, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "soba_katsu", 10, 0.8, false, 35, 2, 4, 4, 0, 1, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "soba_large", 12, 1, false, 35, 2, 4, 4, 2, 2, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "soba_zaru", 6, 0.7, false, 5, 2, 0, 0.5, 0, 0.5, 3.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "onigiri", 6, 0.6, false, 0.5, 1.5, 0, 0, 0.5, 0.5, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "onigiri_bamboo", 7, 0.7, false, 0.5, 1.5, 0, 0, 1.5, 0.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "onigiri_fish", 8, 0.7, false, 0.5, 1.5, 0, 2, 0.5, 1, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "onigiri_mushroom", 7, 0.7, false, 0.5, 1.5, 0, 0, 0, 0.5, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "onigiri_seaweed", 7, 0.7, false, 0.5, 1.5, 0, 0, 1, 1, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "onigiri_tempura", 10, 0.8, false, 0.5, 1.5, 2, 3, 0.5, 1, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "burger_raw", 2, 0.2, false, 1, 0, 2, 2.5, 0, 0, 2, 1, 200),
				new FoodInfo(ModConfig.MODID + "." + "burger", 6, 0.6, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "burger_dish", 10, 0.8, false, 2.5, 1, 2, 3, 1, 1, 2.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_curry", 6, 0.6, false, 0.5, 1.5, 1, 1, 1, 0.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_curry_katsu", 10, 0.8, false, 0.5, 2, 3, 3, 1, 1.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_curry_burger", 10, 0.8, false, 0.5, 2, 3, 3, 1, 1.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_curry_cheese", 8, 0.8, false, 0.5, 1.5, 2, 2, 1, 1.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_curry_cheese_katsu", 12, 0.8, false, 0.5, 2, 3, 4, 1, 2.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_curry_cheese_burger", 12, 0.8, false, 0.5, 2, 3, 4, 1, 2.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "mashed_potato", 5, 0.6, false, 0.5, 2, 0, 0, 2, 0.5, 4, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "mochi", 2, 0.5, false, 0.5, 2, 0, 0, 0, 0, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "mochi_toasted", 4, 0.6, false, 0.5, 2, 0, 0, 0, 0, 1.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "mochi_sakura", 4, 0.6, false, 0.5, 2, 0, 0, 1, 0.5, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "ohagi", 6, 0.6, false, 0.5, 3, 0.5, 0, 0, 0.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "croquette", 6, 0.6, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "natto", 2, 0.5, false, 0.5, 1, 0.5, 2, 0, 0.5, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_natto", 5, 0.6, false, 0.5, 2.5, 0.5, 2, 0, 1, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_natto_egg", 6, 0.6, false, 0.5, 2.5, 1, 3, 0, 1.5, 2.25, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "nikujaga", 8, 0.6, false, 0.5, 1, 2, 3, 1, 1, 3, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "omurice", 8, 0.6, false, 0.5, 2, 3, 4, 2, 2, 2.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_fried", 8, 0.6, false, 0.5, 1.5, 2, 2, 2, 2, 2.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "hamburger", 8, 0.6, false, 0.5, 2, 2, 4, 0, 0.5, 3, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "cheese_burger", 10, 0.8, false, 0.5, 2.5, 2.5, 5, 0, 1, 3, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "mabodofu", 8, 0.6, false, 1, 1, 2, 3, 1, 1, 4, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "maboqiezi", 8, 0.6, false, 1, 1, 1, 3, 2, 1, 4, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "chestnut_toasted", 4, 0.4, false, 0.5, 2, 0, 0, 1, 0, 2.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "soup_red_bean", 6, 0.6, false, 5, 2, 2, 2, 2, 2, 5, 0, 0),
				new FoodInfo(ModConfig.MODID + "." + "pound_cake", 5, 0.6, false, 0.5, 4, 1, 2, 1, 1, 3, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "osuimono", 4, 0.5, false, 50, 0, 0, 0, 0, 1, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "ochazuke", 6, 0.6, false, 50, 0, 0, 2, 0, 2, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "shrimp", 2, 0.6, false, 0.5, 0, 0, 2, 0, 0.5, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "tempura", 5, 0.6, false, 0, 1, 1, 2, 0, 0.5, 1.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "fishcake", 4, 0.6, false, 1, 2, 1, 2.5, 0, 1, 1.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "tofu", 2, 0.4, false, 0.5, 0, 0, 2, 0, 0.5, 3, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "tofu_fried", 4, 0.5, false, 0.5, 0.5, 1, 2, 0, 0.5, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "oden", 8, 0.6, false, 1, 1, 2, 3, 1, 1, 4, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "dananko", 6, 0.6, false, 1, 3, 1, 0, 0, 1, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "danmitarashi", 6, 0.4, false, 1, 3, 1, 0, 0, 1, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "dansansyoku", 6, 0.6, false, 1, 3, 1, 0, 0, 1, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "eggplant_baked", 4, 0.5, false, 1, 0, 0, 0, 2, 0.5, 3, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "fried_chicken", 6, 0.6, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "sashimi", 6, 0.6, false, 1, 0, 0, 3, 0, 1, 4, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "beef_stick", 8, 0.8, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "chicken_stick", 6, 0.4, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "pork_stick", 6, 0.6, false, 2, 0, 2, 2.5, 0, 0, 1.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "ramen_croquette", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "udon_croquette", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "soba_croquette", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "ramen_chicken", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "udon_chicken", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "soba_chicken", 9, 0.8, false, 35, 1.5, 2, 3, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "tamagoyaki", 6, 0.6, false, 0.5, 0.5, 1, 2, 0, 0.5, 3, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "sushi", 5, 0.6, false, 1, 1, 0, 2, 0, 1, 4, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "sushi_tamago", 4, 0.6, false, 1, 1, 1, 2, 0, 1, 4, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "ehoumaki", 8, 0.6, false, 1, 2, 1, 3, 2, 1, 4, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "pudding", 4, 0.4, false, 2, 2, 1, 2, 0, 0, 2.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "pudding_maple", 6, 0.6, false, 2, 3, 2, 2, 0, 0, 2.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "rice_redbean", 6, 0.6, false, 0.5, 4, 1, 0, 0, 0.5, 3, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "fish_bake", 8, 0.8, false, 0.5, 0.5, 0.5, 3, 0, 1, 3, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "fries", 5, 0.6, false, 1, 2, 2, 0, 1, 1, 1, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "furofuki_daikon", 5, 0.6, false, 25, 1, 0, 2, 4, 1, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "cabbage_roll", 4, 0.4, false, 25, 1, 0, 2, 4, 1, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "white_stew", 6, 0.6, false, 35, 2, 2, 2, 2, 2, 5, 0, 0),
				new FoodInfo(ModConfig.MODID + "." + "fruitsalad", 6, 0.6, false, 15, 2, 0, 0, 4, 0.5, 5.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "raw_taiyaki", 2, 0.2, false, 0.5, 0.5, 0.5, 0, 0, 0, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "taiyaki", 6, 0.6, false, 0.5, 4, 2, 3, 0, 0, 1, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "lemon", 1, 0.1, false, 5, 0, 0, 0, 1, 0, 3.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "lemon_juice", 1, 0.1, false, 40, 0, 0, 2, 0, 0, 5, 0, 0),
				new FoodInfo(ModConfig.MODID + "." + "soda_water", 1, 0.1, false, 50, 0, 0, 0, 0, 0, 5, 0, 0),
				new FoodInfo(ModConfig.MODID + "." + "almond", 1, 0.1, false, 0, 0, 2, 0, 0, 0, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "blackcurrant_juice", 1, 0.1, false, 40, 0, 0, 2, 0, 0, 5, 0, 0),
				new FoodInfo(ModConfig.MODID + "." + "orange_juice", 1, 0.1, false, 40, 0, 0, 2, 0, 0, 5, 0, 0),
				new FoodInfo(ModConfig.MODID + "." + "grape_green", 2, 0.2, false, 4, 0.25, 0, 0, 0.5, 0, 5, 0, 0),
				new FoodInfo(ModConfig.MODID + "." + "sliced_cabbage", 2, 0.2, false, 5, 0, 0, 0, 1, 0, 2.5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "sushi_shrimp", 5, 0.6, false, 1, 1, 0, 2, 0, 1, 4, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "curry_omurice", 8, 0.6, false, 0.5, 2, 2, 4, 0, 0.5, 3, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "katsu_dish", 10, 0.8, false, 0.5, 2.5, 2.5, 5, 0, 1, 3, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "croquette_dish", 8, 0.6, false, 1, 1, 2, 3, 1, 1, 4, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "pasta_tomato", 9, 0.8, false, 5, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "pasta_mushroom", 9, 0.8, false, 5, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "pasta_whitesauce", 9, 0.8, false, 5, 1.5, 2, 2.5, 0, 0.5, 5, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "egg_soft", 2, 0.6, false, 1, 2.0, 2.0, 1.5, 0.0, 1.0, 2, 1, 480),
				new FoodInfo(ModConfig.MODID + "." + "egg_soysauce", 4, 0.6, false, 1, 2.0, 2.0, 2, 0.0, 1.5, 1.0, 1, 480),
			]
		);
		new ItemDrinkBase(ModConfig.MODID, "tea", [
			new FoodInfo(ModConfig.MODID + "." + "black_tea", 1, 0.5, false, 50, 0, 0, 0, 1, 0, 5, 0, 0),
			new FoodInfo(ModConfig.MODID + "." + "green_tea", 1, 0.5, false, 50, 0, 0, 0, 1, 0, 5, 0, 0),
			new FoodInfo(ModConfig.MODID + "." + "milk_tea", 1, 0.5, false, 50, 0, 1, 2, 1, 0, 5, 0, 0),
			new FoodInfo(ModConfig.MODID + "." + "milk_green_tea", 1, 0.5, false, 50, 0, 1, 2, 1, 0, 5, 0, 0),
			new FoodInfo(ModConfig.MODID + "." + "earl_grey", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
			new FoodInfo(ModConfig.MODID + "." + "milk_earl_grey", 1, 0.5, false, 50, 0, 1, 2, 2, 0, 5, 0, 0),
			new FoodInfo(ModConfig.MODID + "." + "fruit_tea", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
			new FoodInfo(ModConfig.MODID + "." + "milk_fruit_tea", 1, 0.5, false, 50, 0, 1, 2, 2, 0, 5, 0, 0),
			new FoodInfo(ModConfig.MODID + "." + "lemon_black_tea", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
			new FoodInfo(ModConfig.MODID + "." + "lemon_green_tea", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
			new FoodInfo(ModConfig.MODID + "." + "mint_tea", 1, 0.5, false, 50, 0, 0, 0, 2, 0, 5, 0, 0),
			new FoodInfo(ModConfig.MODID + "." + "barley_tea", 1, 0.5, false, 50, 1, 0, 0, 1, 0, 5, 0, 0),
			new FoodInfo(ModConfig.MODID + "." + "brown_rice_tea", 1, 0.5, false, 50, 1, 0, 0, 1, 0, 5, 0, 0),
		], [
			[["instant_health", 1, 0]],
			[["haste", 600, 0]],
			[["instant_health", 1, 0], ["regeneration", 200, 0]],
			[["haste", 600, 0], ["regeneration", 200, 0]],
			[["water_breathing", 600, 0]],
			[["water_breathing", 1200, 1]],
			[["jump_boost", 600, 0]],
			[["jump_boost", 600, 0], ["regeneration", 200, 0]],
			[["instant_health", 1, 0], ["speed", 400, 0]],
			[["haste", 600, 0], ["speed", 400, 0]],
			[["night_vision", 600, 0]],
			[["resistance", 600, 0]],
			[["resistance", 600, 0]]
		]);


	}
}