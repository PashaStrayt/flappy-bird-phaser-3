import { BIRD_FALLING_DELAY, BIRD_SPEED, assetList } from 'shared/vars';

const ANIMATION_KEY = 'flying-bird';

export class Bird extends Phaser.Physics.Arcade.Sprite {
  private isFalling: boolean;
  private isStunned: boolean;
  private isDead: boolean;
  private lastUpdate = 0;

  private fallingManager: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const { key, sizes: { width, originalWidth } } = assetList.bird;

    super(scene, x, y, key);
    this.setScale(width / originalWidth).setDepth(1);

    this.anims.create({
      key: ANIMATION_KEY,
      frames: this.anims.generateFrameNumbers(key, { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.play(ANIMATION_KEY);

    scene.add.existing(this);
    scene.events.addListener('update', this.update.bind(this));

    this.init();
  }

  private init() {
    this.isFalling = false;
    this.isStunned = false;
    this.isDead = false;
  }

  // TODO: потом переименовать в update и посмотреть, будет ли работать
  public update(delta: number) {
    if (delta - this.lastUpdate < 16) {
      return;
    }
    this.lastUpdate = delta;

    if (this.isDead) {
      return;
    }
    if (this.isStunned) {
      this.fallFast();
    } else if (this.isFalling) {
      this.fall();
    }
  }

  public startFlying(): void {
    this.scene.physics.world.enable(this);

    // Enable gravity
    this.setGravityY(BIRD_SPEED.DOWN);

    // Make initial wind
    this.flap();
  }

  public flap(): void {
    this.isFalling = false;
    if (this.fallingManager) {
      this.fallingManager.remove();
    }
    this.fallingManager = this.scene.time.delayedCall(BIRD_FALLING_DELAY, () => this.isFalling = true);

    this.setVelocityY(-BIRD_SPEED.UP);

    // Rotate up
    if (this.angle > -30) {
      this.angle = -30;

      // const avaliableAngle: number = this.angle - 30;

      // if (avaliableAngle < -30) {
      //   this.angle = -30;
      // } else {
      //   this.angle = avaliableAngle;
      // }
    }
  }

  public fall(): void {
    // Rotate down, but not more than 90 degrees
    if (this.angle < 90) {
      this.angle += 4;
    }
  }

  private fallFast() {
    // Rotate down, but not more than 90 degrees
    if (this.angle < 90) {
      this.angle += 5;
    }
  }

  public stun(): void {
    this.isStunned = true;

    this.anims.stop();
    // this.setFrame(3);
    this.setVelocity(0, 0);
    this.setGravityY(BIRD_SPEED.DOWN * 3);
  }

  public die(): void {
    this.isDead = true;

    this.anims.stop();
    // this.setFrame(3);
  }
}