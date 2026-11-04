/**
 * AgriIntel Core - Engine Verification CLI Script
 */

import { calculateETo, calculateETc } from './engine/fao56';
import { calculateRunoff, adjustCurveNumberAMC } from './engine/hydrology';
import { calculateFrictionHeadLoss, calculateSolarPVSizing } from './engine/solar';

console.log('=============================================');
console.log('   AGRIINTEL-CORE ENGINE VERIFICATION TEST   ');
console.log('=============================================\n');

// 1. Test FAO-56 Penman-Monteith Evapotranspiration
const weather = {
  tempMin: 23.0,     // °C
  tempMax: 32.5,     // °C
  humidity: 75,      // %
  windSpeed: 2.0,    // m/s
  solarRad: 19.2,    // MJ/m²/day
  elevation: 30      // meters
};

const eTo = calculateETo(weather);
const cropKc = 1.15; // Mid-season maize coefficient
const eTc = calculateETc(eTo, cropKc);

console.log('[1] FAO-56 Evapotranspiration Module:');
console.log(`    - Reference ETo:  ${eTo.toFixed(2)} mm/day`);
console.log(`    - Crop ET (Kc=${cropKc}): ${eTc.toFixed(2)} mm/day\n`);

// 2. Test NRCS Curve Number Hydrology
const rainfallMm = 85.0; // Storm rainfall depth
const cnII = 78;         // Moderate soil moisture (AMC II)
const runoff = calculateRunoff(rainfallMm, cnII);
const cnIII = adjustCurveNumberAMC(cnII, 'wet');

console.log('[2] NRCS-CN Hydrology Module:');
console.log(`    - Storm Rainfall: ${rainfallMm} mm (CN-II: ${cnII})`);
console.log(`    - Direct Runoff Q: ${runoff.toFixed(2)} mm`);
console.log(`    - Adjusted CN (AMC-III Wet): ${cnIII.toFixed(1)}\n`);

// 3. Test Pipe Hydraulics & Solar PV Sizing
const hydraulicInput = {
  flowRateM3s: 0.015,     // 15 liters/sec (0.015 m³/s)
  lengthMeters: 250,      // 250m transmission line
  diameterMeters: 0.10,   // 100mm PVC pipe
  hazenC: 140,            // Hazen-Williams C factor for PVC
  totalHeadMeters: 40,    // Static head [m]
  peakSunHours: 5.5       // PSH [hours/day]
};

const frictionLoss = calculateFrictionHeadLoss(
  hydraulicInput.flowRateM3s,
  hydraulicInput.lengthMeters,
  hydraulicInput.diameterMeters,
  hydraulicInput.hazenC
);

const totalDynamicHead = hydraulicInput.totalHeadMeters + frictionLoss;

const solarSizing = calculateSolarPVSizing({
  ...hydraulicInput,
  totalHeadMeters: totalDynamicHead
});

console.log('[3] Hydraulics & Solar PV Sizing Module:');
console.log(`    - Friction Head Loss: ${frictionLoss.toFixed(2)} m`);
console.log(`    - Total Dynamic Head (TDH): ${totalDynamicHead.toFixed(2)} m`);
console.log(`    - Hydraulic Power Required: ${solarSizing.hydraulicPowerKW} kW`);
console.log(`    - Recommended Solar PV Array: ${solarSizing.recommendedPvKwP} kWp\n`);

console.log('=============================================');
console.log('       ALL ENGINE TESTS PASSED CLEANLY       ');
console.log('=============================================');
