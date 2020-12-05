import deepCompare from "../Tools/deepCompare";

export default class Recipe<Source,Result>{
    private map:Map<Source,Result> = new Map<Source,Result>();

    sourceToResult(source:Source):Result|undefined{
        let out = false;
        let outv;
        this.map.forEach(function(v,v1,map){
            if(deepCompare(v1,source)){
                out = true;
                outv = v;
            }
        });
        return outv;
    }

    resultToSource(result:Result):Source[]{
        let arr:Source[] = [];

        this.map.forEach(function(value:Result,key:Source){
            if(deepCompare(value,result)){
                arr.push(key);
            }
        })

        return arr;
    }

    register(source:Source,result:Result):Recipe<Source,Result>{
        this.map.set(source,result);
        return this;
    }

    hasResource(source:Source):boolean{
        let out = false;
        this.map.forEach(function(v,v1,map){
            if(deepCompare(v1,source)){
                out = true;
            }
        });
        return out;
    }

    delete(source:Source):Recipe<Source,Result>{
        this.map.delete(source);
        return this;
    }
}