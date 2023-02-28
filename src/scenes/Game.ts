import Phaser from 'phaser';
import SceneNames from '../constants/SceneNames';
import TextureNames from '../constants/TextureNames';
import Penguin from '../game/Penguin';
import AudioNames from '../constants/AudioNames';
import Chicken from '../game/Chicken';
import Munchie from '../game/Munchie';
import Mushroom from '../game/Mushroom';

export default class Game extends Phaser.Scene{
    private background!: Phaser.GameObjects.TileSprite;
    private mushroom!: Mushroom
    private chicken!: Chicken
    private munchie!: Munchie
    private chicken2!: Chicken
    private munchie2!: Munchie
    private penguin!: Penguin

    constructor(){
        super(SceneNames.Game);
    }

    create(){
        const width = this.scale.width;
        const height = this.scale.height;
        this.background = this.addBackground(width,height);
        this.addPenguinWithPhysics(width,height);
        this.addBackgroundElements();
        this.addBaddies();
        this.addSound();
        this.addPhysicsOverlaps();
    }

    private addPhysicsOverlaps() {
        this.physics.add.overlap(
            this.mushroom, this.penguin, this.handleOverlapBaddie, undefined, this
        );
        this.physics.add.overlap(
            this.chicken, this.penguin, this.handleOverlapBaddie, undefined, this
        );
        this.physics.add.overlap(
            this.chicken2, this.penguin, this.handleOverlapBaddie, undefined, this
        );
        this.physics.add.overlap(
            this.munchie, this.penguin, this.handleOverlapBaddie, undefined, this
        );
        this.physics.add.overlap(
            this.munchie2, this.penguin, this.handleOverlapBaddie, undefined, this
        );
    }

    update(time: number, delta: number): void {
        this.updateBackground();
        this.warpObject(0,1200,390,700,this.mushroom, this.mushroom.body as Phaser.Physics.Arcade.StaticBody);
        this.warpObject(0,550,0,150,this.chicken, this.chicken.body as Phaser.Physics.Arcade.StaticBody);
        this.warpObject(650,1200,150,200,this.chicken2, this.chicken2.body as Phaser.Physics.Arcade.StaticBody);
        this.warpObject(0,1200,300,400,this.munchie, this.munchie.body as Phaser.Physics.Arcade.StaticBody);
        this.warpObject(0,1200,500,640,this.munchie2, this.munchie2.body as Phaser.Physics.Arcade.StaticBody);
    }

    private handleOverlapBaddie(obj1: Phaser.GameObjects.GameObject,
                                obj2: Phaser.GameObjects.GameObject){
        console.log('ope!');
    }

    private addBaddies(){
        this.chicken = new Chicken(this, 0, 50);
        this.munchie = new Munchie(this, 351, 768)
        this.chicken2 = new Chicken(this, 100, 1000);
        this.munchie2 = new Munchie(this, 351, 768)
        this.add.existing(this.chicken);
        this.add.existing(this.munchie);
        this.add.existing(this.munchie2);
        this.add.existing(this.chicken2);
    }

    private addSound(){
        this.sound.add(AudioNames.Background, {loop: true}).play();
    }

    private addBackgroundElements(){
       this.mushroom = new Mushroom(this, 250, 550);
       this.add.existing(this.mushroom);
    }

    private addBackground(width: number, height: number){
        return this.add.tileSprite(0,0,width,height,TextureNames.Background).setOrigin(0).setScrollFactor(0,0);
    }

    private updateBackground(){
        this.background.setTilePosition(this.cameras.main.scrollX);
    }

    private addPenguinWithPhysics(width: number, height: number){
        this.penguin = new Penguin(this, width *0.5, height-4);
        this.add.existing(this.penguin);
        const body = this.penguin.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);
        this.physics.world.setBounds(
            0,0,Number.MAX_SAFE_INTEGER,height-4
        );

        body.setVelocityX(200);

        this.cameras.main.startFollow(this.penguin);
        this.cameras.main.setBounds(0,0,Number.MAX_SAFE_INTEGER,height);
    }

    private warpObject(edge1: number, edge2: number, edge3: number, edge4: number, elementToWarp: any, physicsToWarp: Phaser.Physics.Arcade.StaticBody){
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width;
        
        const width = physicsToWarp.width;
        if(elementToWarp.x + width < scrollX){
            elementToWarp.x = Phaser.Math.Between(
                rightEdge + edge1,
                rightEdge + edge2
            );
            elementToWarp.y = Phaser.Math.Between(edge3, edge4);
            physicsToWarp.position.x = elementToWarp.x + physicsToWarp.offset.x;
            physicsToWarp.position.y = elementToWarp.y;
        }
    }
}