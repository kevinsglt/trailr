/**
 * Streaming Platforms Configuration
 * TMDB Watch Provider IDs for France
 */

export interface Platform {
  id: string;
  name: string;
  providerId: number; // TMDB provider ID
  logo: string;
}

export const PLATFORMS: Platform[] = [
  {
    id: "netflix",
    name: "Netflix",
    providerId: 8,
    logo: "https://image.tmdb.org/t/p/original/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg",
  },
  {
    id: "prime",
    name: "Prime Video",
    providerId: 119,
    logo: "https://image.tmdb.org/t/p/original/emthp39XA2YScoYL1p0sdbAH2WA.jpg",
  },
  {
    id: "disney",
    name: "Disney+",
    providerId: 337,
    logo: "https://image.tmdb.org/t/p/original/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg",
  },
  {
    id: "canal",
    name: "Canal+",
    providerId: 381,
    logo: "https://image.tmdb.org/t/p/original/aQ1ritN00jXc7RAFfUoQKGAAfp7.jpg",
  },
  {
    id: "apple",
    name: "Apple TV+",
    providerId: 350,
    logo: "https://image.tmdb.org/t/p/original/6uhKBfmtzFqOcLousHwZuzcrScK.jpg",
  },
  {
    id: "paramount",
    name: "Paramount+",
    providerId: 531,
    logo: "https://image.tmdb.org/t/p/original/xbhHHa1YgtpwhC8lb1NQ3ACVcLd.jpg",
  },
  {
    id: "ocs",
    name: "OCS",
    providerId: 56,
    logo: "https://image.tmdb.org/t/p/original/bVR4Z1LCHY7gidXAJF5pMa4QrDS.jpg",
  },
  {
    id: "mubi",
    name: "MUBI",
    providerId: 11,
    logo: "https://image.tmdb.org/t/p/original/bVClhIrDJjeLYmhILIh0rrW6M9i.jpg",
  },
];

// Quick lookup by provider ID
export const PROVIDER_ID_MAP = PLATFORMS.reduce(
  (acc, platform) => {
    acc[platform.providerId] = platform;
    return acc;
  },
  {} as Record<number, Platform>
);
