export type MediaType = "image" | "gif" | "video";

export interface Meme {
  id: string;
  title: string;
  mediaType: MediaType;
  fileUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
}
