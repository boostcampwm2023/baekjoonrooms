export interface Difficulty {
  id: number;
  name: string;
}

export const difficultyMapping: { [key: number]: number[] } = {
  1: [1, 2, 3, 4, 5],
  2: [6, 7, 8, 9, 10],
  3: [11, 12, 13, 14, 15],
  4: [16, 17, 18, 19, 20],
  5: [21, 22, 23, 24, 25],
  6: [26, 27, 28, 29, 30],
};
