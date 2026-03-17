/**
 * Web Audio API utilities for reliable sound playback.
 * Browsers limit HTML Audio elements; Web Audio API allows many simultaneous plays.
 */

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioContext = new Ctx();
  }
  return audioContext;
}

export async function getDecodedBuffer(url: string): Promise<AudioBuffer> {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    await ctx.resume();
  }
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  return ctx.decodeAudioData(buf);
}

const bufferCache = new Map<string, AudioBuffer>();

export async function loadSound(url: string): Promise<AudioBuffer> {
  const cached = bufferCache.get(url);
  if (cached) return cached;
  const buf = await getDecodedBuffer(url);
  bufferCache.set(url, buf);
  return buf;
}

export function playBuffer(
  buffer: AudioBuffer,
  volume = 0.6,
  onEnded?: () => void,
): void {
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume().then(() => playBuffer(buffer, volume, onEnded));
      return;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = volume;
    source.connect(gain);
    gain.connect(ctx.destination);
    if (onEnded) source.onended = onEnded;
    source.start(0);
  } catch {
    onEnded?.();
  }
}

/**
 * Play a sound by URL. Loads and caches the buffer on first use.
 * Safe to call many times rapidly (e.g. for click sounds).
 * Call from user gesture (e.g. click) so AudioContext can resume if suspended.
 */
export function playSound(url: string, volume = 0.6): void {
  getAudioContext().resume().catch(() => {});
  loadSound(url)
    .then((buf) => playBuffer(buf, volume))
    .catch(() => {});
}

/**
 * Play a sound and call onEnded when it finishes. For sequential playback.
 * Call from user gesture so AudioContext can resume if suspended.
 */
export function playSoundWithCallback(
  url: string,
  onEnded: () => void,
  volume = 0.6,
): void {
  getAudioContext().resume().catch(() => {});
  loadSound(url)
    .then((buf) => playBuffer(buf, volume, onEnded))
    .catch(() => onEnded());
}
