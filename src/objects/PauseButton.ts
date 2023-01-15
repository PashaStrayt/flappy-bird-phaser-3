import { assetList, config, scenes } from 'shared/vars';

export class PauseButton extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene) {
    const { key, sizes: { width, originalWidth } } = assetList.pauseButton;
    super(scene, (config.width - window.innerWidth / scene.scale.zoom) / 2 + 30, 30, key, 0);
    this.setOrigin(0, 0).setScale(width / originalWidth).setInteractive().on('pointerup', this.managePause.bind(this));

    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();

    scene.add.existing(this);
  }

  private managePause(): void {
    if (this.scene.scene.isPaused(scenes.main)) {
      this.setFrame(0);
      this.scene.scene.resume(scenes.main);
    } else {
      this.setFrame(1);
      this.scene.scene.pause(scenes.main);
    }
  }

  private onResize() {
    this.setX((config.width - window.innerWidth / this.scene.scale.zoom) / 2 + 30);
  }
}