import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from solar4 import calculate_solar_energy, panel_losses, panel_char, coef, STCIrr, STCTemp, sub_data_raw
  
from Load import load_values_from_csv, csv_file_path_solar

def calculate_net_energy(solar_power, load_values, time_interval):
    # Replace NaN values with zeros in both arrays
    solar_power = np.nan_to_num(solar_power)
    load_values = np.nan_to_num(load_values)

    # Calculate net power
    net_power = solar_power - load_values

    # Integrate using trapezoidal rule
    net_energy = np.trapz(net_power, dx=time_interval)

    return net_energy


# Load solar data
solar_file_path = "C:/Users/danie/Desktop/Senior Design/Codes/myenv/csv/test_irr_data.csv"
solar_data_raw = pd.read_csv(solar_file_path, parse_dates=["DateTime"])

# Extract relevant columns and calculate solar power
solar_data_raw["Irradiance (W/m2)"] = pd.to_numeric(solar_data_raw["Irradiance (W/m2)"], errors="coerce")
solar_data_raw["Temp_C (oC)"] = pd.to_numeric(solar_data_raw["Temp_C (oC)"], errors="coerce")
#solar_power = calculate_solar_energy(solar_data_raw["Irradiance (W/m2)"], solar_data_raw["Temp_C (oC)"],
                                      #panel_name_plate_W=panel_char[0], losses=panel_losses["loss_value"], coef=panel_char[1], STCIrr=STCIrr, STCTemp=STCTemp)


# Calculate solar power for the entire dataset
solar_power_full = calculate_solar_energy(solar_data_raw["Irradiance (W/m2)"], solar_data_raw["Temp_C (oC)"],
                                          panel_name_plate_W=680, losses=panel_losses["loss_value"], coef=coef, STCIrr=STCIrr, STCTemp=STCTemp)


# Generate load profile data for the entire dataset
load_values_full = load_values_from_csv(csv_file_path_solar)

#time_interval is the time difference between data points (in hours)
time_interval_full = 1  

# Calculate net energy for the entire dataset
net_energy_full = calculate_net_energy(solar_power_full, load_values_full, time_interval_full)

print("Net Energy (Full Dataset):", net_energy_full)

# Subset solar_power and load_values to the first 100 hours
solar_power_subset = solar_power_full[:100]
load_values_subset_solar = load_values_full[:100]
sub_data_raw = sub_data_raw.dropna()

#time_interval is the time difference between data points (in hours)
time_interval_subset = 1  

# Calculate net energy for the first 100 hours
net_energy_subset = calculate_net_energy(solar_power_subset, load_values_subset_solar, time_interval_subset)

print("Net Energy (First 100 Hours):", net_energy_subset)

print("Length of Solar Power (Full):", len(solar_power_full))
print("Length of Load Values (Full):", len(load_values_full))
print("NaN in Solar Power (Full):", np.isnan(solar_power_full).any())
print("NaN in Load Values (Full):", np.isnan(load_values_full).any())

    
