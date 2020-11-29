namespace Sakura{
    export class LiquidModel{
        private key:string;
        private texture:[string,number][];

        static map:Map<string,LiquidModel> = new Map<string,LiquidModel>();
        constructor(key:string,texture:[string,number][]){
            this.key = key;
            this.texture = texture;
        }
        static register(key:string,texture:[string,number]):LiquidModel{
            let liquid =  new LiquidModel(key,[texture]);
            this.map.set(key,liquid);
            return liquid;
        }
        static getTexture(key:string):[string,number][] | undefined{
            return this.map.get(key)?.texture;
        }
    }
    export class LiquidContainer{
        private data:any;
        private containerId:string;
        private limit:number = 1000;
        private parent:any;
        private container:UI.Container;
        constructor(tileEntity:any,containerId:string){ 
            this.containerId = containerId;
            this.parent = tileEntity;
            this.container = this.parent.container;
            if(!tileEntity.data[containerId]){
                tileEntity.data[containerId] = {
                    liquid : null,
                    amount : 0
                };
            }
            this.data = tileEntity.data[this.containerId];
        }
        setLimit(limit:number):LiquidContainer{
            this.limit = limit;
            return this;
        }
        getLimit():number{
            return this.limit;
        }
        setLiquid(liquid:string,amount:number):LiquidContainer{//尽量不要在本类外使用！
            this.data.liquid = liquid;
            this.data.amount = amount > this.limit ? this.limit : amount;
            return this;
        }
        addLiquid(liquid:string,amount:number):boolean{
            if(this.data.liquid && this.data.liquid !== liquid){
                return false;
            }
            if(this.data.amount === this.limit){
                return false;
            }
            if(!this.data.liquid){
                this.setLiquid(liquid,amount);
                return true;
            }
            if(this.data.liquid && this.data.liquid === liquid){
                this.data.amount = (this.data.amount + amount) > this.limit ? this.limit : (this.data.amount + amount);
                return true;
            }
            return false;
        }
        getLiquid():{liquid:string,amount:number}{
            return {
                liquid : this.data.liquid,
                amount : this.data.amount
            };
        }
        hasLiquid(liquid:[string,number]):[string,number]{
            if(this.data.liquid === liquid[0] && this.data.amount >= liquid[1]){
                return liquid;
            }
            return [liquid[0],0];
        }
        holdLiquidFromContainer(liquid:string,amount:number):boolean{
            if(this.data.liquid === liquid){
                if(this.data.amount > amount){
                    this.data.amount -= amount;
                    return true;
                }
                else if(this.data.amount === amount){
                    this.data.amount = 0;
                    this.data.liquid = null;
                    return true;
                }
                else{
                    return false;
                }
            }
            return false;
        }
        updateScale(scale:string):void{
            let container = this.container;
            let size = container.getBinding(scale, "element_rect");
            if (!size) {
                return;
            }
            var texture = LiquidRegistry.getLiquidUITexture(this.data.liquid, size.width(), size.height());
            container.setBinding(scale, "texture", texture);
            container.setBinding(scale, "value", this.data.amount / this.limit);
        }
    }

    LiquidModel.register("water",["water_still",0]);
    LiquidModel.register("lava",["lava_still",0]);
    LiquidModel.register("milk",["white_bg",0]);
}