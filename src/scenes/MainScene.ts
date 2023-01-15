import Phaser from 'phaser';
import { Background, Bird, EndingScreen, Hint, Pipe, Pipes, ScoreText } from 'objects';
import { assetList, config, scenes } from 'shared/vars';

export class MainScene extends Phaser.Scene {
  private isGameStarted: boolean;
  private isGameOver: boolean;
  private score: number;

  // Game objects
  private background: Background;
  private pipes: Pipes;
  private bird: Bird;
  private hint: Hint;
  private scoreText: ScoreText;
  private endingScreen: EndingScreen;

  constructor() {
    super({ key: scenes.main, active: true });
  }

  public init(): void {
    this.isGameStarted = false;
    this.isGameOver = false;
    this.score = 0;
  }

  public preload(): void {
    Object.entries(assetList).forEach(
      ([, { type, path, key, sizes: { originalWidth: frameWidth, originalHeight: frameHeight } }]) => {
        switch (type) {
          case 'image': {
            this.load.image(key, path);
            break;
          }
          case 'spritesheet':
          default: {
            this.load.spritesheet(key, path, { frameWidth, frameHeight });
            break;
          }
        }
      }
    );
  }

  public create(): void {
    this.physics.world.setFPS(60);
    this.init();

    // Game objects
    this.background = new Background(this, this.onScreenTap.bind(this));
    this.background.startMoving();

    this.bird = new Bird(this, config.width / 2, config.height / 2);

    this.pipes = new Pipes(this);
    this.pipes.initialSpawn();
    this.physics.world.addCollider(this.bird, this.pipes).collideCallback = this.birdCollidePipe.bind(this);

    const groundCollider = this.add.rectangle(
      config.width / 2,
      config.height,
      config.width,
      assetList.ground.sizes.height
    ).setOrigin(0.5, 1);

    this.physics.world.enable(groundCollider);
    (groundCollider.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
    this.physics.world.addCollider(this.bird, groundCollider).collideCallback = this.birdCollideGround.bind(this);

    this.hint = new Hint(this);

    this.scoreText = new ScoreText(this);
    this.scoreText.setVisible(false);

    this.endingScreen = new EndingScreen(this, () => this.scene.restart());
    this.endingScreen.hide();
  }

  public update() {
    if (!this.isGameStarted || this.isGameOver) {
      return;
    }

    const pipeX = (this.pipes.getChildren()[this.score * 2] as Pipe).getRightCenter().x || 0;
    const birdX = this.bird.getLeftCenter().x || 0;
    if (pipeX < birdX) {
      this.scoreText.setText(String(++this.score));
    }
  }

  private onScreenTap(): void {
    if (!this.isGameStarted && !this.isGameOver) { // Case of start game
      this.isGameStarted = true;
      this.isGameOver = false;

      this.startGame();
    } else if (this.isGameStarted && !this.isGameOver) { // Case where the game continues
      this.bird.flap();
    }
  }

  public startGame(): void {
    this.isGameStarted = true;
    this.isGameOver = false;

    this.scoreText.setVisible(true);
    this.hint.hide();
    this.bird.startFlying();
    this.pipes.startSpawn();
  }

  private stopGame(): void {
    if (this.isGameOver) {
      return;
    }

    this.isGameOver = true;
    this.scoreText.setVisible(false);
    this.pipes.stopSpawn();
    this.background.stopMoving();
    this.cameras.main.flash();
  }

  private birdCollidePipe() {
    this.bird.stun();
    this.physics.world.disable(this.pipes);
    this.stopGame();
  }

  private birdCollideGround() {
    this.bird.die();
    this.endingScreen.show(this.score);
    this.stopGame();
  }
}