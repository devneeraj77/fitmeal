import confetti from "canvas-confetti";

/**
 * Fires an ultra-luxurious multi-stage celebratory confetti burst
 * using cyber-lime ribbons, solar gold embers, and white diamonds.
 */
export function fireTierUnlockConfetti() {
  if (typeof window === "undefined") return;

  const count = 200;
  const defaults = {
    origin: { y: 0.65 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // 1. Core cyber lime & solar gold burst
  fire(0.25, {
    spread: 30,
    startVelocity: 55,
    colors: ["#f7fe72", "#f4e76e", "#ffffff"],
  });

  // 2. High-density electric cyber-lime & solar gold ribbons
  fire(0.2, {
    spread: 60,
    colors: ["#f7fe72", "#f4e76e", "#757761"],
  });

  // 3. Wide field dispersion
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.9,
    colors: ["#f7fe72", "#f4e76e", "#757761", "#FFFFFF"],
  });

  // 4. Heavy gravity particles
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    shapes: ["star"],
    colors: ["#f7fe72", "#f4e76e", "#ffffff"],
  });

  // 5. High altitude pop
  fire(0.1, {
    spread: 130,
    startVelocity: 45,
    colors: ["#f7fe72", "#f4e76e", "#ffffff"],
  });
}

/**
 * Fires a sleek side-cannon sweep for badge equip
 */
export function fireBadgeEquipGlint() {
  if (typeof window === "undefined") return;

  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0.1, y: 0.7 },
    colors: ["#f7fe72", "#f4e76e", "#757761"],
    zIndex: 9999,
  });

  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 0.9, y: 0.7 },
    colors: ["#f7fe72", "#f4e76e", "#757761"],
    zIndex: 9999,
  });
}
