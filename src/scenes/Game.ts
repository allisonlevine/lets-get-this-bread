import Phaser from 'phaser';
import SceneNames from '../constants/SceneNames';
import TextureNames from '../constants/TextureNames';
import Penguin from '../game/Penguin';

export default class Game extends Phaser.Scene{
    private background!: Phaser.GameObjects.TileSprite;
    private mushroom!: Phaser.GameObjects.Image
    private flower!: Phaser.GameObjects.Image


    constructor(){
        super(SceneNames.Game);
    }

    create(){
        const width = this.scale.width;
        const height = this.scale.height;
        this.background = this.addBackground(width,height);
        this.addPenguinWithPhysics(width,height);
        this.addBackgroundElements();
    }

    update(time: number, delta: number): void {
        this.updateBackground();
        this.warpObject(100,1000,this.mushroom);
        this.warpObject(0,800,this.flower);

    }

    private addBackgroundElements(){
        this.mushroom = this.add.image(Phaser.Math.Between(500,1500),501,TextureNames.Mushroom);
        this.flower = this.add.image(Phaser.Math.Between(900,1300),600,TextureNames.Flower);
    }

    private addBackground(width: number, height: number){
        return this.add.tileSprite(0,0,width,height,TextureNames.Background).setOrigin(0).setScrollFactor(0,0);
    }

    private updateBackground(){
        this.background.setTilePosition(this.cameras.main.scrollX);
    }

    private addPenguinWithPhysics(width: number, height: number){
        const penguin = new Penguin(this, width *0.5, height-4);
        this.add.existing(penguin);
        const body = penguin.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);
        this.physics.world.setBounds(
            0,0,Number.MAX_SAFE_INTEGER,height-4
        );

        body.setVelocityX(200);

        this.cameras.main.startFollow(penguin);
        this.cameras.main.setBounds(0,0,Number.MAX_SAFE_INTEGER,height);
    }

    private warpObject(edge1: number, edge2: number, elementToWarp: Phaser.GameObjects.Image){
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width;
        if(elementToWarp.x + elementToWarp.width < scrollX){
            elementToWarp.x = Phaser.Math.Between(
                rightEdge + edge1,
                rightEdge + edge2
            )
        }
    }
}