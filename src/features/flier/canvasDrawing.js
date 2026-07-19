/** Traces a rounded-rectangle path on the given 2D context (does not fill/stroke). */
export function tracePillRect(ctx, box) {
  const { x, y, w, h, r } = box;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Draws `image` into `box` using cover-fit (crops to fill, preserving aspect ratio). */
export function drawImageCovering(ctx, image, box) {
  const scale = Math.max(
    box.w / image.naturalWidth,
    box.h / image.naturalHeight,
  );
  const sw = box.w / scale;
  const sh = box.h / scale;
  const sx = (image.naturalWidth - sw) / 2;
  const sy = (image.naturalHeight - sh) / 2;
  ctx.drawImage(image, sx, sy, sw, sh, box.x, box.y, box.w, box.h);
}

/** Resolves a fractional frame config into absolute pixel geometry for a `width`x`height` canvas. */
export function frameToBox(frame, width, height) {
  const w = frame.w * width;
  const h = frame.h * height;
  return {
    x: frame.cx * width - w / 2,
    y: frame.cy * height - h / 2,
    w,
    h,
    r: frame.radius * width,
  };
}
