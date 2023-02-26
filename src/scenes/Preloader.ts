import Phaser from 'phaser';
import TextureNames from '../constants/TextureNames';
import SceneNames from '../constants/SceneNames';
import AnimationNames from '../constants/AnimationNames';

export default class Preloader extends Phaser.Scene{

    constructor(){
        super(SceneNames.Preloader);
    }

    preload(){
        this.loadBackground();
        this.addAtlas();
    }
    
    create(){
        this.createAnimations();
        this.scene.start(SceneNames.Game);
    }
    
    private loadBackground(){
        this.load.image(TextureNames.Background, 'background/bg_single_1.png');
        this.load.image(TextureNames.Mushroom, 'objects/object_mushroom.png');
        this.load.image(TextureNames.Flower, 'objects/object_flower.png');

    }
    
    private addAtlas(){
        this.load.atlas(TextureNames.Penguin, 'penguin/penguin-sprites.png','penguin/penguin-sprites.json');
    }

    private createAnimations(){

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

        this.anims.create({
            key: AnimationNames.PenguinJump,
            frames: this.anims.generateFrameNames(
                TextureNames.Penguin,
                {
                    start: 1,
                    end: 3,
                    prefix: 'penguin_jump',
                    zeroPad: 2,
                    suffix: '.png'
                }
            ),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: AnimationNames.CloudOn,
            frames: [
                {key: TextureNames.Penguin, frame:'weather_cloud_100.png'}
            ]
        });

        this.anims.create({
            key: AnimationNames.PenguinFall,
            frames: [
                {key: TextureNames.Penguin, frame:'penguin_slide01.png'}
            ]
        });
    }


}