import { SHARE_MESSAGE } from './flierConfig';

export function buildFileName(attendeeName) {
  const slug = attendeeName.trim()
    ? `-${attendeeName.trim().toLowerCase().replace(/\s+/g, '-')}`
    : '';
  return `cojag-flier${slug}.png`;
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Shares the flier via the Web Share API (what phones use to hand the image
 * straight to WhatsApp) when available, falling back to a manual
 * download + wa.me link on desktop browsers that can't share files.
 */
export async function shareOrDownloadBlob(blob, filename) {
  const file = new File([blob], filename, { type: blob.type });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text: SHARE_MESSAGE });
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }

  downloadBlob(blob, filename);
  window.open(
    `https://wa.me/?text=${encodeURIComponent(`${SHARE_MESSAGE} (Attach the flier that just saved to your device.)`)}`,
    '_blank',
    'noopener,noreferrer',
  );
}
