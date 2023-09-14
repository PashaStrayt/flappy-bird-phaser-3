import Phaser from 'phaser';
import { config, events } from 'shared/vars';
import './index.scss';

const game = new Phaser.Game(config);
game.events.addListener(events.gameReady, () => {
  const loader = document.getElementById('loader');
  const canvas = document.querySelector('canvas');

  if (loader && canvas) {
    loader.style.display = 'none';
    canvas.style.opacity = '1';
  } else {
    throw new Error('Игра запустилась до построения DOM');
  }
});

const onResize = () => game.scale.setZoom(window.innerHeight / config.height);
window.addEventListener('resize', onResize);
onResize();