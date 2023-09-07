import random from 'random';
import { audioList } from 'shared/vars';

export class AudioController {
  private lastScoreTrackIndex = 0;
  private lastDefeatTrackIndex = 0;

  constructor(private scene: Phaser.Scene) {
    const { key, volume } = audioList.background;
    scene.sound.add(key, { volume, loop: true }).play();
    [audioList.flap, ...audioList.score, ...audioList.defeat].forEach(({ key, volume }) => {
      scene.sound.add(key, { volume });
    });
  }

  public playSound(kind: 'score' | 'defeat' | 'flap') {
    this.scene.sound.getAllPlaying().forEach((audio) => {
      if (audio.key !== audioList.background.key && audio.key !== audioList.flap.key && kind !== 'flap') {
        audio.stop();
      }
    });

    if (kind === 'flap') {
      this.scene.sound.get(audioList.flap.key).play();
      return;
    }

    const lastIndex = kind === 'score' ? this.lastScoreTrackIndex : this.lastDefeatTrackIndex;
    const sounds = kind === 'score' ? audioList.score : audioList.defeat;

    const index = this.calcSoundIndex(lastIndex, sounds.length);
    this.scene.sound.get(sounds[index].key).play();

    switch (kind) {
      case 'score':
        this.lastScoreTrackIndex = index;
        break;

      case 'defeat':
      default:
        this.lastDefeatTrackIndex = index;
        break;
    }
  }

  private calcSoundIndex(lastIndex: number, length: number) {
    if (length < 1) {
      throw new Error('Запредельное значение length. Допустимые значения от 1');
    }

    switch (lastIndex) {
      case 0:
        return random.int(1, length - 1);

      case length - 1:
        return random.int(0, length - 1 - 1);

      default:
        return random.bool() ? random.int(0, lastIndex - 1) : random.int(lastIndex + 1, length - 1);
    }
  }
}