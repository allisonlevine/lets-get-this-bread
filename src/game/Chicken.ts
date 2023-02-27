import Phaser from 'phaser';
import TextureNames from '../constants/TextureNames';
import AnimationNames from '../constants/AnimationNames';

export default class Chicken extends Phaser.GameObjects.Container{
    
    
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene,x,y);
        const chicken = scene.add.sprite(0,0, TextureNames.Chicken)
                        .setFlipX(true)
                        .play(AnimationNames.ChickenFly);
        
        this.add(chicken);
        scene.physics.add.existing(this,true);
        const body = this.body as Phaser.Physics.Arcade.Body;
        const width = chicken.displayWidth;
        const height = chicken.displayHeight;
        body.setSize(width,height);
        body.setOffset(-width*0.5,0);
        body.position.x = this.x + body.offset.x;
        body.position.y = this.y;
    }
}