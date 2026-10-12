import type { Meme } from "../models/Meme";

export interface MemeService {
  list(): Promise<Meme[]>;
  getById(id: string): Promise<Meme | null>;
  save(meme: Meme): Promise<Meme>;
  remove(id: string): Promise<void>;
}
