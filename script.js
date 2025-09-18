function initMap() {
    const svg = document.getElementById('honduras-map').contentDocument;
    const paths = svg.querySelectorAll('path');
    paths.forEach(path => {
        path.addEventListener('click', (e) => {
            const deptName = e.target.getAttribute('title') || e.target.id; // Asume que el SVG tiene title o id
            // Mapear nombre de departamento a código (puedes ajustar según el SVG)
            const deptMap = {
                'Atlántida': '01', 'Choluteca': '02', 'Colón': '03', 'Comayagua': '04',
                'Copán': '05', 'Cortés': '06', 'El Paraíso': '07', 'Francisco Morazán': '08',
                'Gracias a Dios': '09', 'Intibucá': '10', 'Islas de la Bahía': '11',
                'La Paz': '12', 'Lempira': '13', 'Ocotepeque': '14', 'Olancho': '15',
                'Santa Bárbara': '16', 'Valle': '17', 'Yoro': '18'
            };
            const deptCode = deptMap[deptName] || '';
            if (deptCode) {
                document.getElementById('department').value = deptCode;
                loadMunicipalities(deptCode);
            }
        });
    });
}

function loadMunicipalities(deptCode) {
    if (!deptCode) {
        document.getElementById('municipality').innerHTML = '<option value="">Selecciona Municipio</option>';
        return;
    }
    $.ajax({
        url: 'get_municipalities.php',
        type: 'GET',
        data: { dept_code: deptCode },
        dataType: 'json',
        success: function(data) {
            const select = document.getElementById('municipality');
            select.innerHTML = '<option value="">Selecciona Municipio</option>';
            data.forEach(mun => {
                const option = document.createElement('option');
                option.value = mun;
                option.text = mun;
                select.appendChild(option);
            });
        },
        error: function() {
            alert('Error al cargar municipios');
        }
    });
}

function loadCharts() {
    setInterval(updateCharts, 5000);
    updateCharts();
}

function updateCharts() {
    document.querySelectorAll('canvas').forEach(canvas => {
        const dept = canvas.id.replace('chart_', '').replace('_', ' ');
        fetch(`get_votes.php?dept=${dept}`)
            .then(response => response.json())
            .then(data => {
                new Chart(canvas, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(data),
                        datasets: [{
                            label: 'Votos',
                            data: Object.values(data),
                            backgroundColor: Object.keys(data).map(key => getColor(key))
                        }]
                    }
                });
            });
    });
}

function getColor(candidate) {
    const colors = {
        'Nasry Asfura': '#0000FF',
        'Salvador Nasralla': '#00FF00',
        'Xiomara Castro': '#FF0000'
    };
    return colors[candidate] || '#808080';
}