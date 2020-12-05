export default class LiquidContainer{
    private data:any;
    private containerId:string;
    private limit:number = 1000;
    private parent:any;
    private container:UI.Container;//这个属性被弃用了啊，得换一个啊
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
    protected setLiquid(liquid:string,amount:number):LiquidContainer{//尽量不要在本类外使用！ CDX留言：啊？那我私有化了？
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