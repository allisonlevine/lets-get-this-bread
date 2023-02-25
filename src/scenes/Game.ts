import Phaser from 'phaser';
import SceneNames from '../constants/SceneNames';
import TextureNames from '../constants/TextureNames';
import AnimationNames from '../constants/AnimationNames';

export default class Game extends Phaser.Scene{
    private background!: Phaser.GameObjects.TileSprite;

    constructor(){
        super(SceneNames.Game);
    }

    create(){
        const width = this.scale.width;
        const height = this.scale.height;
        this.background = this.addBackground(width,height);
        const pengy = this.addPenguinWithPhysics(width,height);
        this.addCameras(pengy, height);
    }

    update(time: number, delta: number): void {
        this.updateBackground();
    }

    addBackground(width: number, height: number){
        return this.add.tileSprite(0,0,width,height,TextureNames.Background).setOrigin(0).setScrollFactor(0,0);
    }

    updateBackground(){
        this.background.setTilePosition(this.cameras.main.scrollX);
    }

    addPenguinWithPhysics(width: number, height: number){
        const penguin = this.physics.add.sprite(
            width*0.5,
            height-4,
            TextureNames.Penguin,
            'penguin_walk01.png'
        )
        .setOrigin(0.5,1)
        .play(AnimationNames.PenguinWalk);

        const body = penguin.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);
        this.physics.world.setBounds(
            0,0,Number.MAX_SAFE_INTEGER,height-4
        );

        body.setVelocityX(200);

        return penguin;
    }

    addCameras(penguin: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, height: number){
        this.cameras.main.startFollow(penguin);
        this.cameras.main.setBounds(0,0,Number.MAX_SAFE_INTEGER,height);
    }
}