export interface Pokemon {
  name: string;
  url: string;
  height?: number;
  weight?: number;
  sprites?: {
    front_default: string;
  };
  abilities?: Array<{
    ability: {
      name: string;
    };
  }>;
}