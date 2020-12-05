/*
 * @Author: SugarBreeze 
 * @Date: 2020-06-23 22:18:25 
 * @Last Modified by: SugarBreeze
 * @Last Modified time: 2020-07-11 23:54:23
 */

//CC0 licence, do anything you want :)
//(because I think the code is too suck

//魔改by pv糊
LIBRARY({
	name: "BlockModelLibs",
	version: 1,
	shared: false,
	api: "CoreEngine"
});


var Rotate = {
    translate: function (pos, offset) {
        x = pos[0] + offset[0];
        y = pos[1] + offset[1];
        z = pos[2] + offset[2];
        return pos.length == 5 ? [x, y, z, pos[3], pos[4]] : [x, y, z];
    },
    x: function (pos, r, origin) {
        let x = pos[0],
            y = pos[1],
            z = pos[2];
        r *= Math.PI / 180;
        if (origin)
            y -= origin[1], z -= origin[2];
        y = Math.cos(r) * y - Math.sin(r) * z, z = Math.cos(r) * z + Math.sin(r) * (origin ? pos[1] - origin[1] : pos[1]);
        if (origin)
            y += origin[1], z += origin[2];
        return pos.length == 5 ? [x, y, z, pos[3], pos[4]] : [x, y, z];
    },
    y: function (pos, r, origin) {
        let x = pos[0],
            y = pos[1],
            z = pos[2];
        r *= Math.PI / 180;
        if (origin)
            x -= origin[0], z -= origin[2];
        x = Math.cos(r) * x + Math.sin(r) * z, z = Math.cos(r) * z - Math.sin(r) * (origin ? pos[0] - origin[0] : pos[0]);
        if (origin)
            x += origin[0], z += origin[2];
        return pos.length == 5 ? [x, y, z, pos[3], pos[4]] : [x, y, z];
    },
    z: function (pos, r, origin) {
        let x = pos[0],
            y = pos[1],
            z = pos[2];
        r *= Math.PI / 180;
        if (origin)
            x -= origin[0], y -= origin[1];
        x = Math.cos(r) * x - Math.sin(r) * y, y = Math.cos(r) * y + Math.sin(r) * (origin ? pos[0] - origin[0] : pos[0]);
        if (origin)
            x += origin[0], y += origin[1];
        return pos.length == 5 ? [x, y, z, pos[3], pos[4]] : [x, y, z];
    },
    rotate: function (pos, rotation) {
        return this[rotation.axis](pos, rotation.angle, rotation.origin);
    },
    rotateUV: function (_uv, rotation) {
        let rotations = [
            [0, 1, 2, 3], //Normal
            [3, 0, 1, 2], //Mirror
            [2, 3, 0, 1], //180
            [1, 2, 3, 0] //180 Mirror
        ];
        let uv = new Array(4);
        for (i in _uv) 
            uv[i] = _uv[rotations[rotation][i]];
        return uv;
    }
};


var BlockModel = (function () {
    function BlockModel(obj, params) {
        this.json = obj;
        this.model = new ICRender.Model();
        this.collision = new ICRender.CollisionShape();
        this.collisionEntry = this.collision.addEntry();
        this.enableCollision = false;
        if (params && params.collision) 
            this.json.enableCollision = true;
        particle = obj.textures.particle;
        this.texture = typeof particle == "object" ? particle : [particle, 0];
        this.loadTexures(obj.textures);
        this.loadModel(obj.elements);
    };
    BlockModel.prototype.setTexture = function (texture) {
        this.texture = texture;
    };
    BlockModel.prototype.loadTexures = function (textures) {
        for (texture in textures) {
            if (typeof textures[texture] == "string")
                textures[texture] = [textures[texture].split("/")[textures[texture].split("/").length - 1], 0];
        }
        this.textures = textures;
    };
    BlockModel.prototype.standard = function (array) {
        if (array.isStandard)
            return array;
        if (typeof array == "object")
            for (arr in array)
                array[arr] = this.standard(array[arr]);
        else
            return array / 16;
        array.isStandard = true;
        return array;
    };
    BlockModel.prototype.addSide = function (side, size, uv, texture, rotation, rotation2, translate) {
        let sides = ["down", "up", "north", "south", "west", "east"];
        side = typeof side == 'number' ? side : sides.indexOf(side);
        this.standard(size), this.standard(uv);

        let uvs = [
            [1 - size[1][0], 1 - size[1][2], 1 - size[0][0], 1 - size[0][2]], //Down
            [1 - size[1][0], 1 - size[1][2], 1 - size[0][0], 1 - size[0][2]], //Up
            [1 - size[1][0], 1 - size[1][1], 1 - size[0][0], 1 - size[0][1]], //North
            [1 - size[1][0], 1 - size[1][1], 1 - size[0][0], 1 - size[0][1]], //South
            [1 - size[1][2], 1 - size[1][1], 1 - size[0][2], 1 - size[0][1]], //West
            [1 - size[1][2], 1 - size[1][1], 1 - size[0][2], 1 - size[0][1]] //East
        ];
        if (uv == null)
            uv = uvs[side];
        if (rotation2)
            uv = Rotate.rotateUV(uv, rotation2 % 360 / 90);

        let sideVertexs = [
            [
                [size[0][0], size[0][1], size[0][2], uv[0], uv[1]], //Down
                [size[0][0], size[0][1], size[1][2], uv[0], uv[3]],
                [size[1][0], size[0][1], size[1][2], uv[2], uv[3]],
                [size[0][0], size[0][1], size[0][2], uv[0], uv[1]],
                [size[1][0], size[0][1], size[0][2], uv[2], uv[1]],
                [size[1][0], size[0][1], size[1][2], uv[2], uv[3]]
            ],
            [
                [size[0][0], size[1][1], size[0][2], uv[0], uv[1]], //Up
                [size[0][0], size[1][1], size[1][2], uv[0], uv[3]],
                [size[1][0], size[1][1], size[1][2], uv[2], uv[3]],
                [size[0][0], size[1][1], size[0][2], uv[0], uv[1]],
                [size[1][0], size[1][1], size[0][2], uv[2], uv[1]],
                [size[1][0], size[1][1], size[1][2], uv[2], uv[3]]
            ],
            [
                [size[0][0], size[0][1], size[0][2], uv[2], uv[3]], //North
                [size[1][0], size[0][1], size[0][2], uv[0], uv[3]],
                [size[1][0], size[1][1], size[0][2], uv[0], uv[1]],
                [size[0][0], size[0][1], size[0][2], uv[2], uv[3]],
                [size[0][0], size[1][1], size[0][2], uv[2], uv[1]],
                [size[1][0], size[1][1], size[0][2], uv[0], uv[1]]
            ],
            [
                [size[0][0], size[0][1], size[1][2], uv[0], uv[3]], //South
                [size[1][0], size[0][1], size[1][2], uv[2], uv[3]],
                [size[1][0], size[1][1], size[1][2], uv[2], uv[1]],
                [size[0][0], size[0][1], size[1][2], uv[0], uv[3]],
                [size[0][0], size[1][1], size[1][2], uv[0], uv[1]],
                [size[1][0], size[1][1], size[1][2], uv[2], uv[1]]
            ],
            [
                [size[0][0], size[0][1], size[0][2], uv[0], uv[3]], //West
                [size[0][0], size[0][1], size[1][2], uv[2], uv[3]],
                [size[0][0], size[1][1], size[1][2], uv[2], uv[1]],
                [size[0][0], size[0][1], size[0][2], uv[0], uv[3]],
                [size[0][0], size[1][1], size[0][2], uv[0], uv[1]],
                [size[0][0], size[1][1], size[1][2], uv[2], uv[1]]
            ],
            [
                [size[1][0], size[0][1], size[0][2], uv[2], uv[3]], //East
                [size[1][0], size[0][1], size[1][2], uv[0], uv[3]],
                [size[1][0], size[1][1], size[1][2], uv[0], uv[1]],
                [size[1][0], size[0][1], size[0][2], uv[2], uv[3]],
                [size[1][0], size[1][1], size[0][2], uv[2], uv[1]],
                [size[1][0], size[1][1], size[1][2], uv[0], uv[1]]
            ]
        ];
        let vertexs = sideVertexs[side];

        if (rotation && rotation.angle) {
            this.standard(rotation.origin);
            for (vertex in vertexs)
                vertexs[vertex] = Rotate.rotate(vertexs[vertex], rotation);
        }

        if (!texture)
            texture = this.texture;  
        let mesh = new RenderMesh();
        mesh.setBlockTexture(texture[0], texture[1]);

        for (let vertex = 0; vertex < vertexs.length; vertex++)
            mesh.addVertex(vertexs[vertex][0], vertexs[vertex][1], vertexs[vertex][2], vertexs[vertex][3], vertexs[vertex][4]);
        for (let vertex = vertexs.length - 1; vertex >= 0; vertex--)
            mesh.addVertex(vertexs[vertex][0], vertexs[vertex][1], vertexs[vertex][2], vertexs[vertex][3], vertexs[vertex][4]);

        if (translate)
            mesh.translate(translate[0]/16, translate[1]/16, translate[2]/16);
        mesh.rebuild();

        this.model.addEntry(mesh);
        return mesh;
    };
    BlockModel.prototype.loadModel = function (obj) {
        for (element in obj) {
            faces = obj[element].faces;
            for (face in faces) {
                this.addSide(face, [obj[element].from, obj[element].to], faces[face].uv, this.textures[faces[face].texture.substr(1)], obj[element].rotation, faces[face].rotation, obj[element].translate);
            }
            if (this.json.enableCollision) {
                this.enableCollision = true;
                //had been standard in addSide function.
                this.collisionEntry.addBox(obj[element].from[0], obj[element].from[1], obj[element].from[2], obj[element].to[0], obj[element].to[1], obj[element].to[2]);
            }
        }
    };
    BlockModel.prototype.get = function () {
        return this.model;
    };
    BlockModel.prototype.getCollision = function () {
        return this.enableCollision ? this.collision : null;
    };

    return BlockModel;
}());


var ModelHelper = {
    setModelDir: function (dir, bool) {
        this.modelDir = (!bool ? __dir__ : "") + dir;
    },
    loadModel: function (blockID, data, name, params) {
        let model = new BlockModel(FileTools.ReadJSON(this.modelDir + name + ".json"), params || {});
        blockID = typeof blockID == "number" ? blockID : BlockID[blockID];
        BlockRenderer.setStaticICRender(blockID, data, model.get());
        try{
            ItemModel.getFor(blockID, data).setModUiSpriteName(name,0);
        }
        catch(e){
            alert(e.message);
        }
        if (model.getCollision())
            BlockRenderer.setCustomCollisionShape(blockID, data, model.getCollision());
    },
    loadItemModel : function (itemID, data, name, params){
        let obj = FileTools.ReadJSON(this.modelDir + name + ".json");
        if(obj.parent){
            obj.elements = FileTools.ReadJSON(this.modelDir + obj.parent.split("/")[obj.parent.split("/").length - 1] + ".json").elements;
        }
        if(obj.parent){
            for(let i = 0;i < obj.elements.length;i ++){
            let m = [(obj.elements[i].from[0] + obj.elements[i].to[0]) / 2,(obj.elements[i].from[1] + obj.elements[i].to[1]) / 2,(obj.elements[i].from[2] + obj.elements[i].to[2]) / 2];
            let v = [
                obj.elements[i].from[0] - obj.elements[i].to[0],obj.elements[i].from[1] - obj.elements[i].to[1],obj.elements[i].from[2] - obj.elements[i].to[2]
            ];
            obj.elements[i].from = [m[0] - v[0],m[1] - v[1] + 4,m[2] - v[2]];
            obj.elements[i].to = [m[0] + v[0],m[1] + v[1] + 4,m[2] + v[2]];
            }
        }
        let model = new BlockModel(obj, params || {});
        itemID = typeof itemID == "number" ? itemID : ItemID[itemID];
        
        ItemModel.getFor(itemID, data).setModel(model.get());
        try{
            ItemModel.getFor(itemID, data).setModUiSpriteName(name,0);
        }
        catch(e){
            alert(e.message);
        }
    }
};

ModelHelper.setModelDir("resources/assets/sakura/models/item/");//请自行修改路径


EXPORT("Rotate", Rotate);
EXPORT("BlockModel", BlockModel);
EXPORT("ModelHelper", ModelHelper);