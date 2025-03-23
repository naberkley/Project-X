export const rgbToHex = (r: number, g: number, b: number) => {
  const clamp = (value: number) => Math.min(Math.max(value, 0), 255);
  return `#${((1 << 24) + (clamp(r) << 16) + (clamp(g) << 8) + clamp(b))
    .toString(16)
    .slice(1)}`;
};

export const rgbToCMYK = (r: number, g: number, b: number) => {
  const rRatio = r / 255;
  const gRatio = g / 255;
  const bRatio = b / 255;

  const k = 1 - Math.max(rRatio, gRatio, bRatio);
  const c = (1 - rRatio - k) / (1 - k) || 0;
  const m = (1 - gRatio - k) / (1 - k) || 0;
  const y = (1 - bRatio - k) / (1 - k) || 0;

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
};

export const hexToRGB = (hex: string) => {
  if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
    return { r: 0, g: 0, b: 0 }; // Return black for invalid hex
  }
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};