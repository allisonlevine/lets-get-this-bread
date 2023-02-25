import Phaser from 'phaser';
import SceneNames from '../constants/SceneNames';
import TextureNames from '../constants/TextureNames';
import AnimationNames from '../constants/AnimationNames';

export default class Game extends Phaser.Scene{
    constructor(){
        super(SceneNames.Game);
    }

    create(){
        const width = this.scale.width;
        const height = this.scale.height;
        this.add.tileSprite(0,0,width,height,TextureNames.Background).setOrigin(0);
        this.add.sprite(width *0.5, height *0.5,TextureNames.Penguin, 'penguin_walk01.png').play(AnimationNames.PenguinWalk);

    }
}