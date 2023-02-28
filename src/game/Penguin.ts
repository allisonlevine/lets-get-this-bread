import Phaser from 'phaser';
import TextureNames from '../constants/TextureNames';
import AnimationNames from '../constants/AnimationNames';
import SceneNames from '../constants/SceneNames';
import AudioNames from '../constants/AudioNames';

enum PenguinState {
    Running,
    Killed,
    Dead
}

export default class Penguin extends Phaser.GameObjects.Container {
    private cloud!: Phaser.GameObjects.Sprite;
    private penguin!: Phaser.GameObjects.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private penguinState = PenguinState.Running;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.setUpCharactersWithAnimations(scene);
        this.setCursors(scene);
    }

    preUpdate() {
        this.setAnimationsOnControl();
    }

    private setAnimationsOnControl() {
        const body = this.body as Phaser.Physics.Arcade.Body
        switch (this.penguinState) {
            case PenguinState.Running:
                {
                    const body = this.body as Phaser.Physics.Arcade.Body;
                    if (this.cursors.space?.isDown) {
                        body.setAccelerationY(-600);
                        this.penguin.play(AnimationNames.PenguinFall, true);
                        this.enableCloud(true);
                    }
                    else {
                        body.setAccelerationY(0);
                    }

                    if (body.blocked.down) {
                        this.penguin.play(AnimationNames.PenguinWalk, true);
                        this.enableCloud(false);
                    }
                    else if (body.velocity.y > 0) {
                        this.penguin.play(AnimationNames.PenguinFall, true);
                    }
                    break;
                }

            case PenguinState.Killed:
                {
                    body.velocity.x *= 0.99;
                    if (body.velocity.x <= 5) {
                        this.penguinState = PenguinState.Dead;
                    }
                    break;
                }

            case PenguinState.Dead:
                {
                    body.setVelocity(0, 0);
                    this.scene.scene.run(SceneNames.GameOver);
                    break;
                }
        }
    }

    private enableCloud(enabled: boolean) {
        this.cloud.setVisible(enabled);
    }

    private setCursors(scene: Phaser.Scene) {
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    private setUpCharactersWithAnimations(scene: Phaser.Scene) {
        this.penguin = scene.add.sprite(0, 0, TextureNames.Penguin)
            .setOrigin(0.5, 1)
            .play(AnimationNames.PenguinWalk);
        this.cloud = scene.add.sprite(0, 0, TextureNames.Penguin)
            .play(AnimationNames.CloudOn);

        this.enableCloud(false);
        this.add(this.cloud);
        this.add(this.penguin);
        scene.physics.add.existing(this);

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(this.penguin.width, this.penguin.height);
        body.setOffset(this.penguin.width * -0.5, -this.penguin.height);
    }

    kill() {
        if (this.penguinState !== PenguinState.Running) {
            return;
        }
        this.scene.sound.play(AudioNames.Hurt);
        this.penguinState = PenguinState.Killed;
        this.penguin.play(AnimationNames.PenguinDeath);
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setAccelerationY(0);
        body.setVelocity(1000, 0);
        this.enableCloud(false);
    }
}