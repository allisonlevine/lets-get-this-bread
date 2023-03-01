import Phaser from 'phaser';
import SceneNames from '../constants/SceneNames';
import TextureNames from '../constants/TextureNames';
import Penguin from '../game/Penguin';
import AudioNames from '../constants/AudioNames';
import Chicken from '../game/Chicken';
import Munchie from '../game/Munchie';
import Mushroom from '../game/Mushroom';

export default class Game extends Phaser.Scene {
    private background!: Phaser.GameObjects.TileSprite;
    private mushroom!: Mushroom;
    private chicken!: Chicken;
    private munchie!: Munchie;
    private chicken2!: Chicken;
    private munchie2!: Munchie;
    private penguin!: Penguin;
    private quasooos!: Phaser.Physics.Arcade.StaticGroup;
    private scoreLabel!: Phaser.GameObjects.Text;
    private score = 0;

    constructor() {
        super(SceneNames.Game);
    }

    init() {
        this.score = 0;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        this.background = this.addBackground(width, height);
        this.addQuaso();
        this.addPenguinWithPhysics(width, height);
        this.addBackgroundElements();
        this.addBaddies();
        this.addSound();
        this.addPhysicsOverlaps();
        this.addScoreLabel();
    }

    update(time: number, delta: number): void {
        this.updateBackground();
        this.warpObject(0, 1200, 390, 700, this.mushroom, this.mushroom.body as Phaser.Physics.Arcade.StaticBody);
        this.warpObject(0, 550, 0, 150, this.chicken, this.chicken.body as Phaser.Physics.Arcade.StaticBody);
        this.warpObject(650, 1200, 150, 200, this.chicken2, this.chicken2.body as Phaser.Physics.Arcade.StaticBody);
        this.warpObject(0, 1200, 300, 400, this.munchie, this.munchie.body as Phaser.Physics.Arcade.StaticBody);
        this.warpObject(0, 1200, 500, 640, this.munchie2, this.munchie2.body as Phaser.Physics.Arcade.StaticBody);
        this.teleportBackwards();
    }

    private addScoreLabel() {
        this.scoreLabel = this.add.text(10, 10, `Score: ${this.score}`, {
            fontSize: '24px',
            color: '#080808',
            backgroundColor: '#F8E71C',
            shadow: { fill: true, blur: 0, offsetY: 0 },
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        }).setScrollFactor(0);

    }

    private addQuaso() {
        this.quasooos = this.physics.add.staticGroup();
        this.spawnQuasooos();
    }

    private spawnQuasooos() {
        this.quasooos.children.each(child => {
            const quaso = child as Phaser.Physics.Arcade.Sprite;
            this.quasooos.killAndHide(quaso);
            quaso.body.enable = false;
        });
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width;
        var x = rightEdge + 101;
        const numQuasooos = Phaser.Math.Between(1, 10);
        for (var i = 0; i < numQuasooos; ++i) {
            const quaso = this.quasooos.get(x,
                Phaser.Math.Between(100, this.scale.height - 100),
                TextureNames.Croissant) as Phaser.Physics.Arcade.Sprite;
            quaso.setVisible(true);
            quaso.setActive(true);

            const body = quaso.body as Phaser.Physics.Arcade.StaticBody;
            body.setCircle(body.width * 0.5);
            body.enable = true;

            body.updateFromGameObject();
            x += quaso.width * 1.5;
        }
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
        this.physics.add.overlap(
            this.quasooos, this.penguin, this.handleBread, undefined, this
        );
    }

    private handleBread(obj1: Phaser.GameObjects.GameObject,
        obj2: Phaser.GameObjects.GameObject) {
        const quaso = obj2 as Phaser.Physics.Arcade.Sprite;
        this.sound.play(AudioNames.Quaso);
        this.quasooos.killAndHide(quaso);
        quaso.body.enable = false;
        this.score += 1;
        this.scoreLabel.text = `Score: ${this.score}`;
    }

    private handleOverlapBaddie(obj1: Phaser.GameObjects.GameObject,
        obj2: Phaser.GameObjects.GameObject) {
        const pengu2Die = obj2 as Penguin;
        pengu2Die.kill();
    }

    private teleportBackwards() {
        const scrollX = this.cameras.main.scrollX;
        const maxX = 2400;

        if (scrollX > maxX) {
            this.resetBack(maxX);

            this.spawnQuasooos()

            this.quasooos.children.each(child => {
                const coin = child as Phaser.Physics.Arcade.Sprite
                if (!coin.active) {
                    return
                }
                coin.x -= maxX
                const body = coin.body as Phaser.Physics.Arcade.StaticBody
                body.updateFromGameObject()
            })
        }
    }

    private resetBack(maxX: number) {
        this.penguin.x -= maxX;
        this.mushroom.x -= maxX;
        this.chicken.x -= maxX;
        const chickenBody = this.chicken.body as Phaser.Physics.Arcade.StaticBody;
        chickenBody.x -= maxX;
        this.chicken2.x -= maxX;
        const chickenBody2 = this.chicken2.body as Phaser.Physics.Arcade.StaticBody;
        chickenBody2.x -= maxX;
        this.munchie.x -= maxX;
        const munchieBody = this.munchie.body as Phaser.Physics.Arcade.StaticBody;
        munchieBody.x -= maxX;
        this.munchie2.x -= maxX;
        const munchieBody2 = this.munchie2.body as Phaser.Physics.Arcade.StaticBody;
        munchieBody2.x -= maxX;
    }

    private addBaddies() {
        this.chicken = new Chicken(this, 0, 50);
        this.munchie = new Munchie(this, 351, 768)
        this.chicken2 = new Chicken(this, 100, 1000);
        this.munchie2 = new Munchie(this, 351, 768)
        this.add.existing(this.chicken);
        this.add.existing(this.munchie);
        this.add.existing(this.munchie2);
        this.add.existing(this.chicken2);
    }

    private addSound() {
        this.sound.add(AudioNames.Background, { loop: true }).play();
        this.sound.add(AudioNames.Bounce);
        this.sound.add(AudioNames.Quaso);
        this.sound.add(AudioNames.Hurt);
    }

    private addBackgroundElements() {
        this.mushroom = new Mushroom(this, 250, 550);
        this.add.existing(this.mushroom);
    }

    private addBackground(width: number, height: number) {
        return this.add.tileSprite(0, 0, width, height, TextureNames.Background).setOrigin(0).setScrollFactor(0, 0);
    }

    private updateBackground() {
        this.background.setTilePosition(this.cameras.main.scrollX);
    }

    private addPenguinWithPhysics(width: number, height: number) {
        this.penguin = new Penguin(this, width * 0.5, height - 4);
        this.add.existing(this.penguin);
        const body = this.penguin.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);
        this.physics.world.setBounds(
            0, 0, Number.MAX_SAFE_INTEGER, height - 4
        );

        body.setVelocityX(200);

        this.cameras.main.startFollow(this.penguin);
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
    }

    private warpObject(edge1: number, edge2: number, edge3: number, edge4: number, elementToWarp: any, physicsToWarp: Phaser.Physics.Arcade.StaticBody) {
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width;

        const width = physicsToWarp.width;
        if (elementToWarp.x + width < scrollX) {
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