import pandas as pd
import numpy as np

ross_coef = 0.0563
#temperature coefficient used to adjust the ambient temperature to the equivalent cell temperature in a solar panel.
STCIrr = 1000
#Standard Test Conditions Irradiance
STCTemp = 25
#Standard Test Conditions Temperature


file_path = "C:/Users/danie/Desktop/Senior Design/Codes/myenv/csv/test_irr_data.csv"
data_raw_solar = pd.read_csv(file_path, parse_dates=["DateTime"])
#"DateTime" in the CSV file should be treated as datetime objects. 

panel_spec_link = "http://fortunecp.com/wp-content/uploads/2016/02/Fortune-CP-80-85W-Polycrystalline-Solar-Panels.pdf"
panel_char = [85, 17.363, 4.607, 21.427, 4.921]
# list that contains characteristics or specifications related to a solar panel. 
panel_coef = [0.06, -0.33, -0.45]
# coefficients related to the temperature dependence of solar panels:

panel_losses = {"loss_type": ["wire_losses", "Module_mismatch", "Module_Aging", "Dust/Dirt", "converter"],
                "loss_value": [0.1, 0.1, 0.08, 0.11, 0.05]}

system_losses = {"loss_type": ["bat_charging_eff", "bat_discharging_eff", "Combined_losses"],
                 "loss_value": [0.92, 0.92, 0.85]}

coef = panel_coef[2]

def calculate_solar_energy(irradiance, ambient_temp_C, panel_name_plate_W, losses, coef, STCIrr, STCTemp):
    ambient_temp_C_adj = ambient_temp_C + (ross_coef * irradiance)

    # Convert losses to a NumPy array
    losses = np.array(losses)

    # Print or inspect the values to debug
    #print(f"irradiance: {irradiance}")
    #print(f"ambient_temp_C: {ambient_temp_C}")
    #print(f"panel_name_plate_W: {panel_name_plate_W}")
    #print(f"losses: {losses}")  # Make sure it's a NumPy array
    #print(f"coef: {coef}")
    #print(f"STCIrr: {STCIrr}")
    #print(f"STCTemp: {STCTemp}")
    

    p_out = (irradiance / STCIrr) * (panel_name_plate_W + (panel_name_plate_W * (coef / 100) * (ambient_temp_C_adj - STCTemp))) * np.prod(1 - losses)

    return p_out

# Example call
#example_output = calculate_solar_energy(irradiance=100, ambient_temp_C=26, panel_name_plate_W=680,
                                         #losses=panel_losses["loss_value"], coef=coef, STCIrr=STCIrr, STCTemp=STCTemp)

#print("Example Output:", example_output)

# Reduce data for the sake of the example
sub_data_raw_solar = data_raw_solar.head(100)
#print(sub_data_raw.dtypes)

# Convert columns to numeric
#sub_data_raw["Irradiance (W/m2)"] = pd.to_numeric(sub_data_raw["Irradiance (W/m2)"], errors="coerce")
#sub_data_raw["Temp_C (oC)"] = pd.to_numeric(sub_data_raw["Temp_C (oC)"], errors="coerce")

sub_data_raw_solar.loc[:, "Irradiance (W/m2)"] = pd.to_numeric(sub_data_raw_solar["Irradiance (W/m2)"], errors="coerce")
sub_data_raw_solar.loc[:, "Temp_C (oC)"] = pd.to_numeric(sub_data_raw_solar["Temp_C (oC)"], errors="coerce")


# Drop rows with NaN values (if any) after conversion
sub_data_raw = sub_data_raw_solar.dropna()

# Call function for reduced data
hours_100_solar = calculate_solar_energy(sub_data_raw["Irradiance (W/m2)"], sub_data_raw_solar["Temp_C (oC)"],
                                    panel_name_plate_W=680, losses=panel_losses["loss_value"], coef=coef, STCIrr=STCIrr, STCTemp=STCTemp)

print("Sum of hours_100:", np.sum(hours_100_solar))


def calculate_hourly_solar_energy(data, panel_name_plate_W, losses, coef, STCIrr, STCTemp):
    hourly_energy = []
    for index, row in data.iterrows():
        irradiance = row["Irradiance (W/m2)"]
        ambient_temp_C = row["Temp_C (oC)"]
        energy_output = calculate_solar_energy(irradiance, ambient_temp_C, panel_name_plate_W, losses, coef, STCIrr, STCTemp)
        hourly_energy.append(energy_output)
    return hourly_energy

# Convert columns to numeric
data_raw_solar["Irradiance (W/m2)"] = pd.to_numeric(data_raw_solar["Irradiance (W/m2)"], errors="coerce")
data_raw_solar["Temp_C (oC)"] = pd.to_numeric(data_raw_solar["Temp_C (oC)"], errors="coerce")

# Drop rows with NaN values
data_cleaned_solar = data_raw_solar.dropna()

# Call function for reduced data
hourly_solar_energy = calculate_hourly_solar_energy(data_cleaned_solar, panel_name_plate_W=680, losses=panel_losses["loss_value"], coef=coef, STCIrr=STCIrr, STCTemp=STCTemp)

# Add hourly solar energy to the dataframe
data_cleaned_solar["Hourly Solar Energy (W)"] = hourly_solar_energy

# Print the resulting dataframe with hourly solar energy
print(data_cleaned_solar[["DateTime", "Hourly Solar Energy (W)"]])

def print_hourly_output(irradiance, temperature, panel_name_plate_W, losses, coef, STCIrr, STCTemp):
    print("Hourly Solar Energy Output:")
    for i in range(24):
        hour_irradiance = irradiance.iloc[i]
        hour_temperature = temperature.iloc[i]
        hour_output = calculate_solar_energy(hour_irradiance, hour_temperature, panel_name_plate_W, losses, coef, STCIrr, STCTemp)
        print(f"Hour {i + 1}: {hour_output} Wh")

# Example call
print_hourly_output(sub_data_raw["Irradiance (W/m2)"], sub_data_raw_solar["Temp_C (oC)"],
                    panel_name_plate_W=680, losses=panel_losses["loss_value"], coef=coef, STCIrr=STCIrr, STCTemp=STCTemp)