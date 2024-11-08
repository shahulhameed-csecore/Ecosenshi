// DOM Elements for sliders and value displays
const reduceSlider = document.getElementById('reduceSlider');
const reuseSlider = document.getElementById('reuseSlider');
const recycleSlider = document.getElementById('recycleSlider');

const reduceValue = document.getElementById('reduceValue');
const reuseValue = document.getElementById('reuseValue');
const recycleValue = document.getElementById('recycleValue');

// DOM Elements for results
const totalWasteElem = document.getElementById('totalWaste');
const wasteReducedElem = document.getElementById('wasteReduced');
const wasteReusedElem = document.getElementById('wasteReused');
const wasteRecycledElem = document.getElementById('wasteRecycled');
const progressFill = document.getElementById('progressFill');

// Chart.js initialization
const wasteChartCtx = document.getElementById('wasteChart').getContext('2d');

// Total waste managed per year
const totalWaste = 300; // in tons

// Initialize chart
let wasteChart = new Chart(wasteChartCtx, {
    type: 'pie',
    data: {
        labels: ['Waste Reduced', 'Waste Reused', 'Waste Recycled', 'Unmanaged Waste'],
        datasets: [{
            data: [0, 0, 0, totalWaste], // Initialize with zero values for reduced, reused, recycled
            backgroundColor: ['#e74c3c', '#f39c12', '#27ae60', '#95a5a6'],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        }
    }
});

// Function to update the simulation and charts
function updateSimulation() {
    // Get slider values
    const reducePercent = parseInt(reduceSlider.value);
    const reusePercent = parseInt(reuseSlider.value);
    const recyclePercent = parseInt(recycleSlider.value);

    // Update displayed percentages
    reduceValue.innerText = `${reducePercent}%`;
    reuseValue.innerText = `${reusePercent}%`;
    recycleValue.innerText = `${recyclePercent}%`;

    // Calculate waste management results
    const wasteReduced = (totalWaste * reducePercent) / 100;
    const wasteReused = (totalWaste * reusePercent) / 100;
    const wasteRecycled = (totalWaste * recyclePercent) / 100;
    const unmanagedWaste = totalWaste - (wasteReduced + wasteReused + wasteRecycled);

    // Update displayed results
    wasteReducedElem.innerText = wasteReduced.toFixed(2);
    wasteReusedElem.innerText = wasteReused.toFixed(2);
    wasteRecycledElem.innerText = wasteRecycled.toFixed(2);
    
    // Update progress bar width
    const totalManaged = wasteReduced + wasteReused + wasteRecycled;
    const progressPercentage = (totalManaged / totalWaste) * 100;
    progressFill.style.width = `${progressPercentage}%`;

    // Update chart data
    wasteChart.data.datasets[0].data = [wasteReduced, wasteReused, wasteRecycled, unmanagedWaste];
    wasteChart.update();
}

// Event listeners for slider input
reduceSlider.addEventListener('input', updateSimulation);
reuseSlider.addEventListener('input', updateSimulation);
recycleSlider.addEventListener('input', updateSimulation);

// Initial simulation call to set default values
updateSimulation();
