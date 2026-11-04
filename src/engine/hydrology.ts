/**
 * NRCS (SCS) Curve Number Hydrology Engine
 */

export function calculateRunoff(rainfallMm: number, curveNumber: number): number {
  if (curveNumber <= 0 || curveNumber > 100) {
    throw new Error("Curve Number must be between 0 and 100");
  }

  // Potential maximum retention (S) in mm
  const S = (25400 / curveNumber) - 254;

  // Initial abstraction (Ia = 0.2S)
  const initialAbstraction = 0.2 * S;

  // If rainfall is less than initial abstraction, runoff is 0
  if (rainfallMm <= initialAbstraction) {
    return 0;
  }

  // Direct runoff depth (Q) in mm
  const numerator = Math.pow(rainfallMm - initialAbstraction, 2);
  const denominator = rainfallMm - initialAbstraction + S;

  return numerator / denominator;
}

export function adjustCurveNumberAMC(cnII: number, condition: 'dry' | 'wet'): number {
  if (condition === 'dry') {
    // AMC I
    return (4.2 * cnII) / (10 - 0.058 * cnII);
  } else {
    // AMC III
    return (23 * cnII) / (10 + 0.13 * cnII);
  }
}
