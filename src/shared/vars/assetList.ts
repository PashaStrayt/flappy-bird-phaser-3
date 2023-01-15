export const assetList = {
  background: {
    type: 'image',
    key: 'background',
    path: 'assets/images/background.png',
    sizes: {
      originalWidth: 288,
      originalHeight: 512
    }
  },
  ground: {
    type: 'image',
    key: 'ground',
    path: 'assets/images/ground.png',
    sizes: {
      height: 210,
      originalWidth: 24,
      originalHeight: 111
    }
  },
  topPipe: {
    type: 'image',
    key: 'top-pipe',
    path: 'assets/images/top-pipe.png',
    sizes: {
      width: 40,
      originalWidth: 24,
      originalHeight: 111
    }
  },
  bottomPipe: {
    type: 'image',
    key: 'bottom-pipe',
    path: 'assets/images/bottom-pipe.png',
    sizes: {
      width: 40,
      originalWidth: 24,
      originalHeight: 111
    }
  },
  hint: {
    type: 'spritesheet',
    key: 'hint',
    path: 'assets/images/hint.png',
    sizes: {
      width: 260,
      originalWidth: 114,
      originalHeight: 97
    }
  },
  restartButton: {
    type: 'image',
    key: 'restart-button',
    path: 'assets/images/restart-button.png',
    sizes: {
      width: 189,
      originalWidth: 107,
      originalHeight: 38
    }
  },
  pauseButton: {
    type: 'spritesheet',
    key: 'pause-button',
    path: 'assets/images/pause-button.png',
    sizes: {
      width: 58,
      originalWidth: 40,
      originalHeight: 43
    }
  },
  bird: {
    type: 'spritesheet',
    key: 'bird',
    path: 'assets/images/bird.png',
    sizes: {
      width: 80,
      originalWidth: 34,
      originalHeight: 24
    }
  }
} as const;