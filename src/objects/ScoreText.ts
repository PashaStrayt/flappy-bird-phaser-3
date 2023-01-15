import Phaser from 'phaser';
import { config } from 'shared/vars';

export class ScoreText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene) {
    super(
      scene,
      config.width / 2,
      -1,
      '0',
      {
        fontFamily: 'Flappy Bird',
        fontSize: 102,
        color: '#fff',
        stroke: '#523000',
        strokeThickness: 6,
        shadow: { offsetX: 5, offsetY: 5, color: '#523000', stroke: true }
      }
    );
    this.setOrigin(0.5, 0).setDepth(1);

    scene.add.existing(this);
  }
}