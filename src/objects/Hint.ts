import { assetList, config } from 'shared/vars';

export class Hint extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene) {
    const { key, sizes: { width, originalWidth } } = assetList.hint;
    super(scene, config.width / 2, config.height / 2 - 245, key);
    this.setScale(width / originalWidth);

    scene.add.existing(this);
  }

  public show() {
    this.setVisible(true);
  }

  public hide() {
    this.setVisible(false);
  }
}