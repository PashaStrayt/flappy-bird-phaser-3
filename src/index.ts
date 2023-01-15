import Phaser from 'phaser';
import { config } from 'shared/vars';
import './index.scss';

const game = new Phaser.Game(config);

const onResize = () => game.scale.setZoom(window.innerHeight / config.height);

window.addEventListener('resize', onResize);
onResize();