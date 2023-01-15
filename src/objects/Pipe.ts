import { CELL_HEIGHT, HOLE_CELLS, assetList } from 'shared/vars';

export class Pipe extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, holeIndex: number, orientation: 'upper' | 'lower') {
    const { key, sizes: { width, originalWidth } } = assetList[orientation === 'upper' ? 'topPipe' : 'bottomPipe'];
    const y = CELL_HEIGHT * (holeIndex + (orientation === 'upper' ? 0 : HOLE_CELLS));
    super(scene, x, y, key);
    this.setScale(width / originalWidth);
    if (orientation === 'upper') {
      // Set origin to bottom left corner
      this.setOrigin(0, 1);
    } else if (orientation === 'lower') {
      // Set origin to top left corner
      this.setOrigin(0);
    }
    scene.physics.world.enable(this);
    this.body?.setSize(this.width * 0.79, this.height * 0.97);

    this.scene.add.existing(this);
  }
}