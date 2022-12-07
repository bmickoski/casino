export interface Game {
  'game-id': number;
  slug: string;
  title: string;
  'game-url': string;
  'game-image': GameImage;
}

export interface GameImage {
  src: string;
  srcset: string;
}
