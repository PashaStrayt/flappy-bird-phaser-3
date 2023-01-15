import Phaser from 'phaser';
import { PauseButton } from 'objects';
import { assetList, scenes } from 'shared/vars';

export class ServiceScene extends Phaser.Scene {
  constructor() {
    super({ key: scenes.service, active: true });
  }

  public preload(): void {
    const { key, path, sizes: { originalWidth: frameWidth, originalHeight: frameHeight } } = assetList.pauseButton;
    this.load.spritesheet(key, path, { frameWidth, frameHeight });
  }

  public create() {
    new PauseButton(this);
  }
}