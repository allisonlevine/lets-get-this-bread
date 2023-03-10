import Phaser from 'phaser';
import TextureNames from '../constants/TextureNames';
import AnimationNames from '../constants/AnimationNames';

export default class Munchie extends Phaser.GameObjects.Container{
    
    
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene,x,y);
        const muncha = scene.add.sprite(0,0, TextureNames.Munchie)
                    .setOrigin(0.5,0)
                    .play(AnimationNames.MunchieMunch);

        this.add(muncha);
        scene.physics.add.existing(this, true);
        const body = this.body as Phaser.Physics.Arcade.StaticBody;
        const width = muncha.displayWidth-25;
        const height = muncha.displayHeight-10;
        body.setSize(width*.8,height*.9);  
        body.setOffset(-width*0.4,0);
        body.position.x = this.x + body.offset.x;
        body.position.y = this.y;
    }
}