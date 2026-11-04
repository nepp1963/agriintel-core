# Mathematical Specification (`FORMULAS.md`)

## 1. FAO-56 Penman-Monteith Evapotranspiration ($ET_o$)

$$ET_o = \frac{0.408\Delta(R_n - G) + \gamma \frac{900}{T + 273} u_2 (e_s - e_a)}{\Delta + \gamma(1 + 0.34 u_2)}$$

### Variables
* $ET_o$: Reference evapotranspiration [$\text{mm/day}$]
* $R_n$: Net radiation [$\text{MJ/m}^2/\text{day}$] | $G$: Soil heat flux [$\approx 0$ for daily]
* $T$: Mean daily temperature at 2m [$\text{^\circ C}$]
* $u_2$: Wind speed at 2m [$\text{m/s}$]
* $e_s - e_a$: Vapor pressure deficit [$\text{kPa}$]
* $\Delta$: Slope vapor pressure curve [$\text{kPa/^\circ C}$]
* $\gamma$: Psychrometric constant [$\text{kPa/^\circ C}$]

### Key Calculations
* **Pressure ($P$)**: $P = 101.3 \left( \frac{293 - 0.0065 z}{293} \right)^{5.26}$ ($z$ = elevation in meters)
* **Psychrometric ($\gamma$)**: $\gamma = 0.665 \times 10^{-3} P$
* **Sat. Vapor Pressure ($e_s$)**: $e^0(T) = 0.6108 \exp\left(\frac{17.27 T}{T + 237.3}\right)$
* **Crop ET ($ET_c$)**: $ET_c = K_c \times ET_o$

---

## 2. NRCS (SCS) Curve Number Hydrology

### Direct Runoff ($Q$)
$$Q = \frac{(P - 0.2S)^2}{P + 0.8S} \quad \text{for } P > 0.2S \quad (\text{else } Q = 0)$$

### Potential Retention ($S$)
$$S = \frac{25400}{CN} - 254 \quad [\text{mm}]$$

### AMC Adjustments
* **AMC I (Dry)**: $CN_I = \frac{4.2 CN_{II}}{10 - 0.058 CN_{II}}$
* **AMC III (Wet)**: $CN_{III} = \frac{23 CN_{II}}{10 + 0.13 CN_{II}}$

---

## 3. Hydraulics & Solar PV Sizing

### Friction Loss (Hazen-Williams)
$$h_f = 10.67 \times \frac{L \cdot Q^{1.852}}{C^{1.852} \cdot D^{4.871}}$$

### Hydraulic Power ($P_{\text{hyd}}$)
$$P_{\text{hyd}} = \frac{\rho \cdot g \cdot Q \cdot H_{\text{total}}}{3600 \times 1000} \quad [\text{kW}]$$

### Solar PV Capacity ($P_{\text{array}}$)
$$P_{\text{array}} = \frac{P_{\text{hyd}}}{\eta_{\text{pump}} \times \eta_{\text{inv}} \times F_{\text{derating}} \times \text{PSH}} \quad [\text{kW}_p]$$
