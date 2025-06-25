export function getYoutubeThumbnail(
  url: string,
  quality: 'default' | 'hq' | 'mq' = 'default'
): string {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);

  if (!match || !match[1]) return 'https://icdipc.tycg.gov.tw/images/fullscreen-bg.jpg';

  const videoId = match[1];

  const qualityMap = {
    default: `https://img.youtube.com/vi/${videoId}/default.jpg`, // 120x90
    mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, // 320x180
    hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, // 480x360
  };

  return qualityMap[quality];
}

export function getYoutubeEmbedUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const videoId =
      urlObj.hostname === 'youtu.be' ? urlObj.pathname.slice(1) : urlObj.searchParams.get('v');

    if (!videoId) return '';

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return '';
  }
}
