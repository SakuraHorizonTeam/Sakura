namespace Sakura{
    export class FoodInfo{
        private readonly name:string;
	    private readonly amount:number;
	    private readonly calories:number;
	    private readonly isWolfFood:boolean;
	    //TFC-TNG FoodHandler parameters
	    private readonly water:number;
	    private readonly carbohydrates:number;
	    private readonly fat:number;
	    private readonly protein:number;
	    private readonly vitamins:number;
	    private readonly minerals:number;
	    private readonly isNonDecaying:boolean;
	    private readonly decayModifier:number;
	    private readonly heatable:boolean;
	    private readonly heatCapacity:number;
        private readonly cookingTemp:number;
        
        constructor(name:string,amount:number,calories:number,iswolffood:boolean=false,water:number=1,carbohydrates:number=1,fat:number=0,protein:number=0,vitamins:number=0,
            minerals:number=0,decayModifier:number=1,heatCapacity:number=0,cookingTemp:number=0){
                this.name = name;
                this.amount = amount;
                this.calories = calories;
                this.isWolfFood = iswolffood;
        
                //TFC-TNG FoodHandler parameters
                this.water = water;
                this.carbohydrates = carbohydrates;
                this.fat = fat;
                this.protein = protein;
                this.vitamins = vitamins;
                this.minerals = minerals;
                this.decayModifier = decayModifier;
                this.isNonDecaying = decayModifier <= 0;
                this.heatable = cookingTemp >= 0;
                this.heatCapacity = heatCapacity;
                this.cookingTemp = cookingTemp;
        }
        
        public getName():string{
            return this.name;
        }

        public getCalories():number{
            return this.calories;
        }
    }
}