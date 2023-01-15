import { calcHoleIndex } from 'shared/utils';
import { BIRD_SPEED, PIPE_DISTANCE, assetList, config } from 'shared/vars';

import { Pipe } from './Pipe';

export class Pipes extends Phaser.Physics.Arcade.Group {
  private lastHoleIndex: number | null;
  private spawner: Phaser.Time.TimerEvent;

  private get lastSpawnX() {
    const pipes = this.getChildren() as Pipe[];
    return pipes?.[pipes.length - 1]?.body?.x || config.width / 2;
  }

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
    this.scene.add.existing(this);

    this.init();
  }

  private init() {
    this.lastHoleIndex = null;
  }

  public startSpawn() {
    const delay = (PIPE_DISTANCE + assetList.bottomPipe.sizes.width) / (BIRD_SPEED.FORWARD) * 1000;
    this.spawner = this.scene.time.addEvent({
      delay,
      startAt: delay,
      callback: () => {
        this.spawnPipe();
        this.setVelocityX(-BIRD_SPEED.FORWARD);
      },
      loop: true
    });
  }

  public stopSpawn() {
    if (this.spawner) {
      this.spawner.destroy();
    }

    this.setVelocityX(0);
  }

  /** Спавн нескольких труб до начала игры с целью заполнить видимое простанство на экране */
  public initialSpawn() {
    const amount = 1;
    for (let i = 0; i < amount; i++) {
      this.spawnPipe();
    }
  }

  private spawnPipe() {
    const x = this.lastSpawnX + PIPE_DISTANCE + assetList.bottomPipe.sizes.width;
    const holeIndex = calcHoleIndex(this.lastHoleIndex);
    (['upper', 'lower'] as const).forEach((orientation) => {
      this.add(new Pipe(this.scene, x, holeIndex, orientation));
    });

    this.lastHoleIndex = holeIndex;
  }
}