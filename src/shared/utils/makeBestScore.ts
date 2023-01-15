/** Считает, записывает лучший счет в localStorage и возвращает его */
export const makeBestScore = (score: number) => {
  let bestScore = Number(window.localStorage.getItem('best-score')) || 0;
  if (score > bestScore) {
    bestScore = score;
    window.localStorage.setItem('best-score', score.toString());
  }

  return bestScore;
};