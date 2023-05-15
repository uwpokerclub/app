export function playSound(
  audioContext: AudioContext,
  frequency: number,
  startTime: number,
  duration: number
): void {
  const osc1 = audioContext.createOscillator();
  const volume = audioContext.createGain();

  // Set oscillator wave type
  osc1.type = "triangle";
  volume.gain.value = 0.5;
  // Set up node routing
  osc1.connect(volume);
  volume.connect(audioContext.destination);
  // Detune oscillators for chorus effect
  osc1.frequency.value = frequency;
  // Fade out
  volume.gain.setValueAtTime(0.1, startTime + duration - 0.05);
  volume.gain.linearRampToValueAtTime(0, startTime + duration);
  // Start oscillators
  osc1.start(startTime);
  // Stop oscillators
  osc1.stop(startTime + duration);
}
