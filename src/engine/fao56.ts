/**
 * FAO-56 Penman-Monteith Reference Evapotranspiration (ETo) Engine
 */

export interface WeatherInput {
  tempMin: number;      // Minimum daily temperature [°C]
  tempMax: number;      // Maximum daily temperature [°C]
  humidity: number;     // Mean relative humidity [%]
  windSpeed: number;    // Wind speed at 2m height [m/s]
  solarRad: number;     // Net solar radiation [MJ/m²/day]
  elevation: number;    // Elevation above sea level [m]
}

export function calculateETo(data: WeatherInput): number {
  const { tempMin, tempMax, humidity, windSpeed, solarRad, elevation } = data;
  
  // Mean temperature
  const T = (tempMax + tempMin) / 2;

  // Atmospheric pressure (P)
  const P = 101.3 * Math.pow((293 - 0.0065 * elevation) / 293, 5.26);

  // Psychrometric constant (gamma) [kPa/°C]
  const gamma = 0.665 * Math.pow(10, -3) * P;

  // Saturation vapor pressure (es) [kPa]
  const esMin = 0.6108 * Math.exp((17.27 * tempMin) / (tempMin + 237.3));
  const esMax = 0.6108 * Math.exp((17.27 * tempMax) / (tempMax + 237.3));
  const es = (esMax + esMin) / 2;

  // Actual vapor pressure (ea) [kPa]
  const ea = es * (humidity / 100);

  // Vapor Pressure Deficit (es - ea)
  const vpd = es - ea;

  // Slope of vapor pressure curve (Delta) [kPa/°C]
  const delta = (4098 * (0.6108 * Math.exp((17.27 * T) / (T + 237.3)))) / Math.pow(T + 237.3, 2);

  // Soil heat flux (G) assumed 0 for daily steps
  const G = 0;

  // Penman-Monteith numerator and denominator terms
  const term1 = 0.408 * delta * (solarRad - G);
  const term2 = gamma * (900 / (T + 273)) * windSpeed * vpd;
  const denominator = delta + gamma * (1 + 0.34 * windSpeed);

  const ETo = (term1 + term2) / denominator;
  return Math.max(0, ETo); // Ensure non-negative
}

export function calculateETc(eTo: number, kc: number): number {
  return eTo * kc;
}
