// Get DOM elements
const activityLevel = document.getElementById('activityLevel');
const energyMix = document.getElementById('energyMix');
const activityValue = document.getElementById('activityValue');
const energyValue = document.getElementById('energyValue');
const co2Emissions = document.getElementById('co2Emissions');
const temperatureRise = document.getElementById('temperatureRise');
const emissionsChartCtx = document.getElementById('emissionsChart').getContext('2d');
const resetButton = document.getElementById('resetButton');

// Initial variables
let emissions = 11.5; // Default CO2 emissions
let temperature = 0.0; // Default temperature rise

// Function to calculate CO2 emissions
function calculateEmissions(activity, renewables) {
    let baseEmissions = activity * 2;
    let reducedEmissions = baseEmissions * (1 - renewables / 100);
    return parseFloat(reducedEmissions.toFixed(2));
}

// Function to calculate temperature rise
function calculateTemperatureRise(emissions) {
    return parseFloat((emissions / 5).toFixed(2));
}

// Function to update all outputs
function updateSimulation() {
    const activity = parseInt(activityLevel.value);
    const renewables = parseInt(energyMix.value);

    activityValue.innerText = activity;
    energyValue.innerText = renewables + "%";

    emissions = calculateEmissions(activity, renewables);
    temperature = calculateTemperatureRise(emissions);

    co2Emissions.innerText = emissions;
    temperatureRise.innerText = temperature;

    updateChart(emissions);
}

// Function to update the chart with new data points
function updateChart(emissions) {
    if (emissionsChart.data.labels.length >= 10) {
        emissionsChart.data.labels.shift();
        emissionsChart.data.datasets[0].data.shift();
    }

    emissionsChart.data.labels.push(new Date().toLocaleTimeString());
    emissionsChart.data.datasets[0].data.push(emissions);
    emissionsChart.update();
}

// Function to reset the simulation
function resetSimulation() {
    activityLevel.value = 5;
    energyMix.value = 20;
    emissionsChart.data.labels = [];
    emissionsChart.data.datasets[0].data = [];
    updateSimulation();
}

// Initialize the chart
const emissionsChart = new Chart(emissionsChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'CO2 Emissions (Gt CO2)',
            data: [],
            borderColor: 'rgba(231, 76, 60, 1)',
            backgroundColor: 'rgba(231, 76, 60, 0.2)',
            borderWidth: 2,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 8,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'CO2 Emissions (Gt)'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `CO2 Emissions: ${context.raw} Gt`;
                    }
                }
            }
        }
    }
});

// Event listeners for range inputs and reset button
activityLevel.addEventListener('input', updateSimulation);
energyMix.addEventListener('input', updateSimulation);
resetButton.addEventListener('click', resetSimulation);

// Initial update
updateSimulation();
