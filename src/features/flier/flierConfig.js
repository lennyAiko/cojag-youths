import templateSrc from '../../assets/flier-template.jpeg';

export const TEMPLATE_SRC = templateSrc;

export const MAX_NAME_LENGTH = 24;

/**
 * Fractional (0-1) placement of the photo cutout on the template image, so
 * the geometry stays correct at the template's native resolution regardless
 * of how large the on-screen canvas is rendered.
 */
export const PHOTO_FRAME = {
  cx: 0.298,
  cy: 0.472,
  w: 0.4,
  h: 0.535,
  radius: 0.025,
  ringColor: '#1d3be0',
  ringWidthRatio: 0.016,
};

/** Fractional placement + styling of the attendee's name text. */
export const NAME_TEXT = {
  cx: 0.298,
  cy: 0.795,
  sizeRatio: 0.062,
  fontFamily: `'Alex Brush', cursive`,
  gradientFrom: '#e3a53c',
  gradientTo: '#7c430f',
};

export const SHARE_MESSAGE =
  "I'll be attending the COJAG 2026 Youth Convention — “The Right Steps”! 🙌 Sun 13 Sept 2026, 8:30AM. Come with me!";
