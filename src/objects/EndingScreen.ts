import Phaser from 'phaser';
import { makeBestScore } from 'shared/utils';
import { assetList, config } from 'shared/vars';

export class EndingScreen extends Phaser.GameObjects.Layer {
  private scoreText: Phaser.GameObjects.Text;
  private bestScoreText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, onRestart: () => void) {
    super(scene);
    this.setDepth(1);

    const gameOverText = scene.add.text(
      config.width / 2,
      config.height / 2 - 130,
      'GAME OVER',
      {
        fontFamily: 'Flappy Bird',
        fontSize: 96,
        color: '#fca048',
        stroke: '#fff',
        strokeThickness: 6,
        shadow: { offsetX: 5, offsetY: 5, color: '#523000', stroke: true }
      }
    ).setOrigin(0.5);
    this.scoreText = scene.add.text(
      config.width / 2,
      config.height / 2 - 10,
      '',
      {
        fontFamily: 'Flappy Bird',
        fontSize: 72,
        color: '#fff',
        stroke: '#523000',
        strokeThickness: 6,
        shadow: { offsetX: 5, offsetY: 5, color: '#523000', stroke: true }
      }
    ).setOrigin(0.5);
    this.bestScoreText = scene.add.text(
      config.width / 2,
      config.height / 2 + 60,
      '',
      {
        fontFamily: 'Flappy Bird',
        fontSize: 72,
        color: '#fff',
        stroke: '#523000',
        strokeThickness: 6,
        shadow: { offsetX: 5, offsetY: 5, color: '#523000', stroke: true }
      }
    ).setOrigin(0.5);
    const { key, sizes: { width, originalWidth } } = assetList.restartButton;
    const restartButton = scene.add.image(config.width / 2, config.height / 2 + 190, key);
    restartButton.setScale(width / originalWidth).setInteractive().on('pointerup', onRestart);

    [gameOverText, this.scoreText, this.bestScoreText, restartButton].forEach((gameObject) => this.add(gameObject));
    scene.add.existing(this);
  }

  public show(score: number) {
    this.setAlpha(1);
    this.scoreText.setText(`SCORE ${score}`);
    this.bestScoreText.setText(`BEST SCORE ${makeBestScore(score)}`);
  }

  public hide() {
    this.setAlpha(0);
  }
}