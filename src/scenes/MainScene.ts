import Phaser from 'phaser';
import { Background, Bird, EndingScreen, Hint, Pipe, Pipes, ScoreText } from 'objects';
import { assetList, audioList, config, events, scenes } from 'shared/vars';
import { AudioController } from 'entities';

export class MainScene extends Phaser.Scene {
  private isAssetsLoaded: boolean;
  private isGameStarted: boolean;
  private isGameOver: boolean;
  private isAudioInit = false;
  private score: number;

  private audioController: AudioController;

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
    [audioList.background, audioList.flap, ...audioList.score, ...audioList.defeat].forEach(({ key, path }) => {
      this.load.audio(key, path);
    });
  }

  public create(): void {
    this.physics.world.setFPS(60);
    this.init();

    // Init controller once per session
    if (!this.isAudioInit) {
      this.isAudioInit = true;
      this.audioController = new AudioController(this);
    }

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

    if (!this.isAssetsLoaded) {
      this.game.events.emit(events.gameReady);
      this.isAssetsLoaded = true;
    }
  }

  public update() {
    if (!this.isGameStarted || this.isGameOver) {
      return;
    }

    const pipeX = (this.pipes.getChildren()[this.score * 2] as Pipe).getRightCenter().x || 0;
    const birdX = this.bird.getLeftCenter().x || 0;
    if (pipeX < birdX) {
      this.scoreText.setText(String(++this.score));
      this.audioController.playSound('score');
    }
  }

  private onScreenTap(): void {
    if (!this.isGameStarted && !this.isGameOver) { // Case of start game
      this.isGameStarted = true;
      this.isGameOver = false;

      this.startGame();
    } else if (this.isGameStarted && !this.isGameOver) { // Case where the game continues
      this.bird.flap();
      this.audioController.playSound('flap');
    }
  }

  public startGame(): void {
    this.isGameStarted = true;
    this.isGameOver = false;

    this.scoreText.setVisible(true);
    this.hint.hide();
    this.bird.startFlying();
    this.audioController.playSound('flap');
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
    this.audioController.playSound('defeat');
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