namespace ModPlus{
    export class ObjectPool<Member>{
        set:Set<Member>;
        constructor(){
            this.set = new Set<Member>();
        }
        add(count:number){
            
        }
    }
}