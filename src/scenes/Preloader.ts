import Phaser from 'phaser';
import TextureNames from '../constants/TextureNames';
import SceneNames from '../constants/SceneNames';
import AnimationNames from '../constants/AnimationNames';

export default class Preloader extends Phaser.Scene{
    constructor(){
        super(SceneNames.Preloader);
    }
    preload(){
        this.load.image(TextureNames.Background, 'background/bg_single_1.png');
        this.load.atlas(TextureNames.Penguin, 'penguin/penguin-sprites.png','penguin/penguin-sprites.json');
    }
    create(){
        this.createAnimation();
        this.scene.start(SceneNames.Game);
    }

    createAnimation(){
        this.anims.create({
            key: AnimationNames.PenguinWalk,
            frames: this.anims.generateFrameNames(TextureNames.Penguin,{
                start: 1,
                end: 4,
                prefix: 'penguin_walk',
                zeroPad: 2,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat:-1
        });
    }
}