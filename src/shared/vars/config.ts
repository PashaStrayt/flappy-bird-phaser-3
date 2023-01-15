import { MainScene, ServiceScene } from 'scenes';

export const config = {
  width: 1080 / 9 * 21,
  height: 1080,
  autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  parent: 'root',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  antialias: false,
  powerPreference: 'high-performance',
  disableContextMenu: true,
  scene: [MainScene, ServiceScene]
};