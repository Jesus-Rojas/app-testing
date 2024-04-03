export class Person {
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weigth: number,
    public heigth: number,
  ) { }

  calcIMC(): string {
    const result = Math.round(this.weigth / (Math.pow(this.heigth, 2)));
    if (result < 0) return 'not found';
    if (result < 19) return 'down';
    if (result < 25) return 'normal';
    if (result < 27) return 'overweigth';
    if (result < 30) return 'overweigth level 1';
    if (result < 40) return 'overweigth level 2';
    return 'overweigth level 3';
  }
}