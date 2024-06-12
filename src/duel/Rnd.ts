// This class is for pseudo random number generation.
// By default, the initial seed is set completly randomly.
// But if you ever want to reproduce a specific sequence of random numbers,
// then you can set the seed to a specific number.
class Rnd {
  seed: number;

  constructor(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  // Returns a random integer from 0 up to max-1
  nextInt(max: number) {
    // This formula for generating random numbers was taken from:
    // https://gist.github.com/blixt/f17b47c62508be59987b
    this.seed = Math.floor(this.seed * 16807) % 2147483647;
    return this.seed % max;
  }
}

export const RND = new Rnd(Math.random());
