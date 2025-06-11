/**
 * Utility functions for the Three.js project
 */

/**
 * Converts degrees to radians
 * @param {number} degrees - The angle in degrees
 * @returns {number} The angle in radians
 */
export function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Generates a random number within a range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number within the range
 */
export function random(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Linearly interpolates between two values
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 */
export function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

/**
 * Clamps a value between a minimum and maximum
 * @param {number} value - The value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
