// DOM Elements for sliders and value displays
const deforestationRate = document.getElementById('deforestationRate');
const reforestationRate = document.getElementById('reforestationRate');
const industrialActivity = document.getElementById('industrialActivity');
const yearsInput = document.getElementById('years');

const deforestationValue = document.getElementById('deforestationValue');
const reforestationValue = document.getElementById('reforestationValue');
const industrialActivityValue = document.getElementById('industrialActivityValue');
const forestLoss = document.getElementById('forestLoss');
const co2Emissions = document.getElementById('co2Emissions');
const carbonLoss = document.getElementById('carbonLoss');
const temperatureRise = document.getElementById('temperatureRise');
const biodiversityLoss = document.getElementById('biodiversityLoss');

// Chart.js initialization
const forestChartCtx = document.getElementById('forestChart').getContext('2d');
const impactChartCtx = document.getElementById('impactChart').getContext('2d');

// Initialize chart data
let forestChart = new Chart(forestChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Forest Cover (Million Hectares)',
            data: [],
            backgroundColor: 'rgba(46, 204, 113, 0.3)',
            borderColor: '#2ecc71',
            fill: true,
        }]
    },
    options: {
        responsive: true,
    }
});

let impactChart = new Chart(impactChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            { label: 'CO2 Emissions (Gt)', data: [], backgroundColor: '#e74c3c' },
            { label: 'Carbon Sequestration Loss (Gt)', data: [], backgroundColor: '#f39c12' },
            { label: 'Temperature Rise (°C)', data: [], backgroundColor: '#3498db' },
            { label: 'Biodiversity Loss', data: [], backgroundColor: '#9b59b6' },
        ]
    },
    options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
    }
});

// Update simulation based on input
function updateSimulation() {
    const defRate = parseInt(deforestationRate.value);
    const reRate = parseInt(reforestationRate.value);
    const industrialRate = parseInt(industrialActivity.value);
    const years = parseInt(yearsInput.value);

    deforestationValue.innerText = defRate;
    reforestationValue.innerText = reRate;
    industrialActivityValue.innerText = industrialRate + "%";

    // Initialize arrays to hold values over time
    let forestCover = 3700; // starting forest cover
    let forestLossArr = [];
    let co2Arr = [];
    let sequestrationLossArr = [];
    let tempRiseArr = [];
    let biodiversityArr = [];

    // Calculate impacts for each year
    for (let i = 0; i < years; i++) {
        const netForestLoss = defRate - reRate;
        forestCover -= netForestLoss;
        const co2Emission = (netForestLoss * 0.5).toFixed(2);
        const sequestrationLoss = (netForestLoss * 0.25).toFixed(2);
        const tempRise = ((netForestLoss * 0.001) + (industrialRate * 0.0001)).toFixed(3);
        const biodiversity = Math.round(netForestLoss * 0.8 + industrialRate * 0.2);

        forestLossArr.push(forestCover);
        co2Arr.push(co2Emission);
        sequestrationLossArr.push(sequestrationLoss);
        tempRiseArr.push(tempRise);
        biodiversityArr.push(biodiversity);
    }

    // Display results for the last year
    forestLoss.innerText = defRate - reRate;
    co2Emissions.innerText = co2Arr[years - 1];
    carbonLoss.innerText = sequestrationLossArr[years - 1];
    temperatureRise.innerText = tempRiseArr[years - 1];
    biodiversityLoss.innerText = biodiversityArr[years - 1];

    // Update chart data
    forestChart.data.labels = Array.from({length: years}, (_, i) => `Year ${i + 1}`);
    forestChart.data.datasets[0].data = forestLossArr;
    forestChart.update();

    impactChart.data.labels = forestChart.data.labels;
    impactChart.data.datasets[0].data = co2Arr;
    impactChart.data.datasets[1].data = sequestrationLossArr;
    impactChart.data.datasets[2].data = tempRiseArr;
    impactChart.data.datasets[3].data = biodiversityArr;
    impactChart.update();
}

// Event listeners
[deforestationRate, reforestationRate, industrialActivity, yearsInput].forEach(input => {
    input.addEventListener('input', updateSimulation);
});

// Initial simulation call
updateSimulation();

