/**
 * Pipe Hydraulics & Solar PV Micro-Grid Sizing Engine
 */

export interface HydraulicInput {
  flowRateM3s: number;    // Volumetric flow rate [m³/s]
  lengthMeters: number;   // Equivalent pipe length [m]
  diameterMeters: number; // Inside pipe diameter [m]
  hazenC?: number;        // Hazen-Williams roughness (default 140 for PVC/HDPE)
  totalHeadMeters: number;// Total Dynamic Head (TDH) [m]
  peakSunHours: number;   // PSH [hours/day]
}

export function calculateFrictionHeadLoss(
  flowRate: number,
  length: number,
  diameter: number,
  cFactor: number = 140
): number {
  // Hazen-Williams equation: hf = 10.67 * L * Q^1.852 / (C^1.852 * D^4.871)
  const numerator = 10.67 * length * Math.pow(flowRate, 1.852);
  const denominator = Math.pow(cFactor, 1.852) * Math.pow(diameter, 4.871);
  return numerator / denominator;
}

export function calculateSolarPVSizing(input: HydraulicInput) {
  const { flowRateM3s, totalHeadMeters, peakSunHours } = input;

  // Water density (kg/m³) and gravity (m/s²)
  const rho = 1000;
  const g = 9.81;

  // Hydraulic power in kW: P_hyd = (rho * g * Q * H) / 1000 (Watts to kW conversion)
  const hydraulicPowerKW = (rho * g * flowRateM3s * totalHeadMeters) / 1000;

  // System efficiencies and derating factors
  const pumpEfficiency = 0.65;    // 65% standard wire-to-water
  const inverterEfficiency = 0.95;// 95% VFD efficiency
  const deratingFactor = 0.80;    // Temperature & dust derating

  // Required PV Array Capacity (kWp)
  const pvArrayKwP = hydraulicPowerKW / (pumpEfficiency * inverterEfficiency * deratingFactor * peakSunHours);

  return {
    hydraulicPowerKW: Number(hydraulicPowerKW.toFixed(3)),
    recommendedPvKwP: Number(pvArrayKwP.toFixed(2))
  };
}
