import { useCallback, useEffect, useRef, useState } from 'react';
import { drawImageCovering, frameToBox, tracePillRect } from './canvasDrawing';
import { NAME_TEXT, PHOTO_FRAME, TEMPLATE_SRC } from './flierConfig';

/**
 * Owns the flier <canvas>: loads the template once, composites the
 * attendee's photo + name onto it, and re-renders whenever either changes.
 * Drawing is imperative (direct canvas calls) rather than state-driven,
 * since the canvas pixels aren't something React needs to reconcile.
 */
export function useFlierCanvas() {
  const canvasRef = useRef(null);
  const photoImageRef = useRef(null);

  const [templateImage, setTemplateImage] = useState(null);
  const [attendeeName, setAttendeeName] = useState('');
  const [photoLabel, setPhotoLabel] = useState('');

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setTemplateImage(img);
    };
    img.src = TEMPLATE_SRC;
    return () => {
      cancelled = true;
    };
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !templateImage) return;

    const width = templateImage.naturalWidth;
    const height = templateImage.naturalHeight;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(templateImage, 0, 0, width, height);

    const frameBox = frameToBox(PHOTO_FRAME, width, height);
    const photo = photoImageRef.current;

    if (photo) {
      ctx.save();
      tracePillRect(ctx, frameBox);
      ctx.clip();
      drawImageCovering(ctx, photo, frameBox);
      ctx.restore();
    }

    ctx.lineWidth = Math.max(4, PHOTO_FRAME.ringWidthRatio * width);
    ctx.strokeStyle = PHOTO_FRAME.ringColor;
    tracePillRect(ctx, frameBox);
    ctx.stroke();

    if (attendeeName) {
      const fontSize = NAME_TEXT.sizeRatio * width;
      const x = NAME_TEXT.cx * width;
      const y = NAME_TEXT.cy * height;
      const gradient = ctx.createLinearGradient(
        x - fontSize * 2,
        y,
        x + fontSize * 2,
        y,
      );
      gradient.addColorStop(0, NAME_TEXT.gradientFrom);
      gradient.addColorStop(1, NAME_TEXT.gradientTo);

      ctx.fillStyle = gradient;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `700 ${fontSize}px ${NAME_TEXT.fontFamily}`;
      ctx.fillText(attendeeName, x, y);
    }
  }, [templateImage, attendeeName]);

  useEffect(() => {
    render();
  }, [render]);

  // Web fonts can finish loading after the first render; redraw once ready
  // so the name doesn't get stuck on the fallback font.
  useEffect(() => {
    document.fonts?.ready?.then(render);
  }, [render]);

  const setPhotoFile = useCallback(
    (file) => {
      if (!file) return;
      setPhotoLabel(file.name);

      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        photoImageRef.current = img;
        render();
        URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;
    },
    [render],
  );

  const getFlierBlob = useCallback(
    () =>
      new Promise((resolve) => {
        render();
        canvasRef.current?.toBlob(resolve, 'image/png');
      }),
    [render],
  );

  return {
    canvasRef,
    isTemplateReady: Boolean(templateImage),
    photoLabel,
    attendeeName,
    setAttendeeName,
    setPhotoFile,
    getFlierBlob,
  };
}
