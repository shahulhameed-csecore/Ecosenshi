// Remove loader after page loads
window.addEventListener("load", function() {
    const loader = document.getElementById("loader");
    loader.classList.add("fade-out");
});



// Chart.js Data Visualization
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Climate Change', 'Plastic Pollution', 'Deforestation'],
        datasets: [{
            label: 'Severity (1-10)',
            data: [9, 8, 7],
            backgroundColor: ['#4CAF50', '#FF6347', '#FFB347']
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

// Function to simulate fetching real-time data
function fetchRealTimeData() {
    // Simulating random severity data for demonstration purposes
    const randomSeverity = () => Math.floor(Math.random() * 10) + 1;

    chart.data.datasets[0].data = [
        randomSeverity(), // Climate Change severity
        randomSeverity(), // Plastic Pollution severity
        randomSeverity()  // Deforestation severity
    ];
    
    chart.update();
}

// Update chart every 5 seconds
setInterval(fetchRealTimeData, 5000);

// Pledge Form Submission
document.getElementById('pledgeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    document.getElementById('pledgeMessage').innerText = `Thank you, ${name}, for taking the pledge!`;
    document.getElementById('pledgeForm').reset();
});

// Newsletter Subscription
document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    document.getElementById('newsletterMessage').innerText = `Thank you for subscribing, ${email}!`;
    document.getElementById('newsletterForm').reset();
});
