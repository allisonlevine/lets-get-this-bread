import Phaser from 'phaser';
import TextureNames from '../constants/TextureNames';

export default class Mushroom extends Phaser.GameObjects.Container{
    
    
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene,x,y);
        const mushroom =  scene.add.image(0, 0, TextureNames.Mushroom)
                            .setOrigin(0.5, 0);
        

        this.add(mushroom);
        scene.physics.add.existing(this, true);

        const body = this.body as Phaser.Physics.Arcade.StaticBody;
        const width = mushroom.displayWidth;
        const height = mushroom.displayHeight;

        body.setSize(width, height);
        body.setOffset(-width * 0.5, 0);

        body.position.x = this.x + body.offset.x;
        body.position.y = this.y;
    }
}