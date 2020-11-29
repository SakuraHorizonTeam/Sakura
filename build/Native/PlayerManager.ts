namespace Sakura{
    export class PlayerManager{
        static canPlaceBlock(pos:Vector):boolean{
            let playerPos = Player.getPosition();
            if(pos.y === Math.floor(playerPos.y) - 1 || pos.y === Math.floor(playerPos.y)){
                if(pos.x === Math.floor(playerPos.x) || pos.x === Math.ceil(playerPos.x)){
                    if(pos.z === Math.floor(playerPos.z) || pos.z === Math.ceil(playerPos.z)){
                        return false;
                    }
                }
            }
            return true;
        }
    }
}