import Phaser from 'phaser';
import TextureNames from '../constants/TextureNames';
import SceneNames from '../constants/SceneNames';
import AnimationNames from '../constants/AnimationNames';
import AudioNames from '../constants/AudioNames';

export default class Preloader extends Phaser.Scene{

    constructor(){
        super(SceneNames.Preloader);
    }

    preload(){
        this.loadImages();
        this.addAtlas();
        this.loadSound();
    }
    
    create(){
        this.createPenguinAnimations();
        this.createBaddiesAnimation();
        this.scene.start(SceneNames.Game);
    }
    
    private loadSound(){
        this.load.audio(AudioNames.Background, 'sounds/background.wav');
        this.load.audio(AudioNames.Bounce, 'sounds/jump.mp3');
        this.load.audio(AudioNames.Hurt, 'sounds/ouch.wav');
        this.load.audio(AudioNames.Quaso, 'sounds/quaso.mp3');
    }

    private loadImages(){
        this.load.image(TextureNames.Background, 'background/bg_single_1.png');
        this.load.image(TextureNames.Mushroom, 'objects/object_mushroom.png');
        this.load.image(TextureNames.Croissant, 'food/pastry_croissant.png');
        
    }
    
    private addAtlas(){
        this.load.atlas(TextureNames.Penguin, 'penguin/penguin-sprites.png','penguin/penguin-sprites.json');
        this.load.atlas(TextureNames.Munchie, 'munchie/croco-bite.png','munchie/croco-bite.json');
        this.load.atlas(TextureNames.Chicken, 'chicken/chickadee.png','chicken/chickadee.json');
    }

    private createBaddiesAnimation(){
        this.anims.create({
            key: AnimationNames.MunchieMunch,
            frames: [
                {key: TextureNames.Munchie, frame:'croc_side_mouthclosed.png'},
                {key: TextureNames.Munchie, frame:'croc_side_mouthopen.png'}
            ],
            frameRate: 2,
            repeat:-1
        });

        this.anims.create({
            key: AnimationNames.ChickenFly,
            frames: [
                {key: TextureNames.Chicken, frame:'frame-1.png'},
                {key: TextureNames.Chicken, frame:'frame-2.png'},
                {key: TextureNames.Chicken, frame:'frame-3.png'},
                {key: TextureNames.Chicken, frame:'frame-4.png'}
            ],
            frameRate: 10,
            repeat:-1
        });
    }

    private createPenguinAnimations(){
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

        this.anims.create({
            key: AnimationNames.PenguinDeath,
            frames: this.anims.generateFrameNames( TextureNames.Penguin,
            {
                start: 1,
                end: 4,
                prefix: 'penguin_die',
                zeroPad: 2,
                suffix: '.png'
            }),
            frameRate:10
        });
    }


}