// Constants
const translateBtn = document.getElementById('translateBtn');
const textInput = document.getElementById('textInput');
const errorDiv = document.getElementById('error');
const wordFrequencyTableBody = document.getElementById('wordFrequencyBody');
const tableViewBtn = document.getElementById('tableViewBtn');
const chartViewBtn = document.getElementById('chartViewBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const urlInput = document.getElementById('urlInput');

let chartInstance = null

// Event listeners
translateBtn.addEventListener('click', translateAndDisplay);
tableViewBtn.addEventListener('click', switchToTableView);
chartViewBtn.addEventListener('click', switchToChartView);
analyzeBtn.addEventListener('click', fetchHTMLbyURL);

function fetchHTMLbyURL() {
    // http://localhost:63342/word-frequency-app/word-frequency-app/test.html
    const url = urlInput.value.trim();

    errorDiv.textContent = '';

    if (!url) {
        errorDiv.style.display = 'block'
        errorDiv.textContent = 'Please enter a valid URL.';
        return;
    }

    // TODO ES6 async / await approach
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            const text = new DOMParser().parseFromString(html, 'text/html').body.textContent;
            document.getElementById('textInput').value = text;
            errorDiv.style.display = 'none'
            translateAndDisplay();
        })
        .catch(error => {
            errorDiv.style.display = 'block'
            errorDiv.textContent = 'Error fetching content from URL.';
        });
}

function switchToTableView() {
    tableView.style.display = 'block';
    chartView.style.display = 'none';

    tableViewBtn.classList.add('active');
    chartViewBtn.classList.remove('active');
}

function switchToChartView() {
    tableView.style.display = 'none';
    chartView.style.display = 'block';

    chartViewBtn.classList.add('active');
    tableViewBtn.classList.remove('active');
}

function translateAndDisplay() {
    const inputText = textInput.value.trim();

    errorDiv.textContent = '';

    if (!inputText) {
        errorDiv.textContent = 'Please enter some text.';
        errorDiv.style.display = 'block'
        return;
    }

    errorDiv.style.display = 'none'

    const wordFrequencyMap = {};
    const words = inputText.toLowerCase().split(/\s+/);

    words.forEach(word => {
        wordFrequencyMap[word] = (wordFrequencyMap[word] || 0) + 1;
    });

    const sortedWordFrequency = Object.entries(wordFrequencyMap)
        .sort((a, b) => b[1] - a[1]);

    wordFrequencyTableBody.innerHTML = '';

    sortedWordFrequency.forEach(([word, frequency]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${word}</td><td>${frequency}</td>`;
        wordFrequencyTableBody.appendChild(row);
    });

    renderChart(sortedWordFrequency)
}

function renderChart(sortedWordFrequency) {
    const labels = sortedWordFrequency.map(([word]) => word);
    const frequencies = sortedWordFrequency.map(([word, frequency]) => frequency);
    const ctx = document.getElementById('wordFrequencyChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy()
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Word Frequency',
                data: frequencies,
                borderColor: '#28a745',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}