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

export const audioList = {
  background: {
    key: 'background-track',
    path: 'assets/audio/background.mp3',
    volume: 0.4
  },
  flap: {
    key: 'flap-track',
    path: 'assets/audio/flap.mp3',
    volume: 0.15
  },
  score: [
    {
      key: 'score-0-track',
      path: 'assets/audio/score/0.mp3',
      volume: 0.1
    },
    {
      key: 'score-1-track',
      path: 'assets/audio/score/1.mp3',
      volume: 0.1
    },
    {
      key: 'score-2-track',
      path: 'assets/audio/score/2.mp3',
      volume: 0.1
    },
    {
      key: 'score-3-track',
      path: 'assets/audio/score/3.mp3',
      volume: 0.1
    },
    {
      key: 'score-4-track',
      path: 'assets/audio/score/4.mp3',
      volume: 0.1
    },
    {
      key: 'score-5-track',
      path: 'assets/audio/score/5.mp3',
      volume: 0.1
    }
  ],
  defeat: [
    {
      key: 'defeat-0-track',
      path: 'assets/audio/defeat/0.mp3',
      volume: 0.1
    },
    {
      key: 'defeat-1-track',
      path: 'assets/audio/defeat/1.mp3',
      volume: 0.1
    },
    {
      key: 'defeat-2-track',
      path: 'assets/audio/defeat/2.mp3',
      volume: 0.1
    },
    {
      key: 'defeat-3-track',
      path: 'assets/audio/defeat/3.mp3',
      volume: 0.1
    },
    {
      key: 'defeat-4-track',
      path: 'assets/audio/defeat/4.mp3',
      volume: 0.1
    },
    {
      key: 'defeat-5-track',
      path: 'assets/audio/defeat/5.mp3',
      volume: 0.14
    },
    {
      key: 'defeat-6-track',
      path: 'assets/audio/defeat/6.mp3',
      volume: 0.35
    },
    {
      key: 'defeat-7-track',
      path: 'assets/audio/defeat/7.mp3',
      volume: 0.37
    },
    {
      key: 'defeat-8-track',
      path: 'assets/audio/defeat/8.mp3',
      volume: 0.24
    },
    {
      key: 'defeat-9-track',
      path: 'assets/audio/defeat/9.mp3',
      volume: 0.1
    },
    {
      key: 'defeat-10-track',
      path: 'assets/audio/defeat/10.mp3',
      volume: 0.38
    }
  ]
} as const;