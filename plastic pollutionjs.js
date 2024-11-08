// Get DOM elements
const plasticProduction = document.getElementById('plasticProduction');
const recyclingRate = document.getElementById('recyclingRate');
const mismanagementRate = document.getElementById('mismanagementRate');

const productionValue = document.getElementById('productionValue');
const recyclingValue = document.getElementById('recyclingValue');
const mismanagementValue = document.getElementById('mismanagementValue');

const wasteMismanaged = document.getElementById('wasteMismanaged');
const plasticOceans = document.getElementById('plasticOceans');

// Chart context
const pollutionChartCtx = document.getElementById('pollutionChart').getContext('2d');

// Initialize plastic pollution chart
let pollutionChart = new Chart(pollutionChartCtx, {
    type: 'bar',
    data: {
        labels: ['Waste Mismanaged (Million Tons)', 'Plastic in Oceans (Million Tons)'],
        datasets: [{
            label: 'Plastic Pollution',
            data: [45, 6.75], // Initial data
            backgroundColor: ['rgba(231, 76, 60, 0.6)', 'rgba(52, 152, 219, 0.6)'],
            borderColor: ['rgba(231, 76, 60, 1)', 'rgba(52, 152, 219, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Update simulation values
function updateSimulation() {
    // Get slider values
    const production = parseInt(plasticProduction.value);
    const recycling = parseInt(recyclingRate.value);
    const mismanagement = parseInt(mismanagementRate.value);

    // Update displayed values
    productionValue.innerText = production;
    recyclingValue.innerText = recycling + "%";
    mismanagementValue.innerText = mismanagement + "%";

    // Calculate mismanaged waste and plastic in oceans
    const wasteMismanagedTons = (production * (100 - recycling) / 100) * (mismanagement / 100);
    const plasticInOceansTons = wasteMismanagedTons * 0.15; // 15% of mismanaged plastic ends up in oceans

    // Update displayed results
    wasteMismanaged.innerText = wasteMismanagedTons.toFixed(2);
    plasticOceans.innerText = plasticInOceansTons.toFixed(2);

    // Update chart data
    pollutionChart.data.datasets[0].data = [wasteMismanagedTons, plasticInOceansTons];
    pollutionChart.update();
}

// Event listeners
plasticProduction.addEventListener('input', updateSimulation);
recyclingRate.addEventListener('input', updateSimulation);
mismanagementRate.addEventListener('input', updateSimulation);

// Initial simulation update
updateSimulation();
