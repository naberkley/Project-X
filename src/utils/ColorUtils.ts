export const rgbToHex = (r: number, g: number, b: number) =>
  `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

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
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};