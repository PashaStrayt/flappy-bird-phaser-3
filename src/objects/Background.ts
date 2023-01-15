import Phaser from 'phaser';
import { assetList, config } from 'shared/vars';

export class Background extends Phaser.GameObjects.Group {
  private background: Phaser.GameObjects.TileSprite;
  private ground: Phaser.GameObjects.TileSprite;
  private mover!: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, onScreenTap: () => void) {
    super(scene);

    // eslint-disable-next-line no-constant-condition
    if (true) {
      const { key, sizes: { originalHeight } } = assetList.background;
      this.background = scene.add.tileSprite(
        config.width / 2,
        config.height / 2,
        config.width,
        originalHeight,
        key
      ).setScale(config.height / originalHeight).setInteractive().on('pointerdown', onScreenTap);
      this.add(this.background);
    }

    const { key, sizes: { height, originalHeight } } = assetList.ground;
    this.ground = scene.add.tileSprite(
      config.width / 2,
      config.height,
      config.width,
      originalHeight,
      key
    ).setOrigin(0.5, 1).setScale(height / originalHeight).setDepth(1);
    this.add(this.ground);

    scene.add.existing(this);
  }

  public startMoving(): void {
    this.mover = this.scene.time.addEvent({
      delay: 10,
      startAt: 0,
      callback: () => {
        this.background.tilePositionX += 1;
        this.ground.tilePositionX += 1.5;
      },
      loop: true
    });
  }

  public stopMoving(): void {
    this.mover.destroy();
  }
}