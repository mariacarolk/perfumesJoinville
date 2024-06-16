document.getElementById('searchButton').addEventListener('click', function() {
    console.log('Botão de busca clicado');
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    fetch('files/perfumes_historico.txt')
        .then(response => response.text())
        .then(data => {
            console.log('Dados do CSV:', data);
            const parsedData = Papa.parse(data, { header: false, delimiter: ';' }).data;
            console.log('Dados parseados:', parsedData);
            const filteredData = parsedData.filter(row => {
                if (row[1] && row[8]) {
                    return row[1].toLowerCase().includes(searchInput) || row[8].toLowerCase().includes(searchInput);
                }
            });

            console.log('Resultados filtrados:', filteredData);
            displayResults(filteredData);
        });
});


function displayResults(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    if (data.length === 0) {
        resultDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    } else {
        const table = document.createElement('table');
        table.className = 'table table-striped';
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        thead.innerHTML = '<tr><th> </th><th>Nome</th><th>Tamanho</th><th>Marca</th><th>Preço</th><th>Link comparar preços</th></tr>';
        table.appendChild(thead);
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="images/${row[1]}.jpg" alt="Imagem"></td>
                <td><b>${row[1]}</b></td>
                <td>${row[2]} ml</td>
                <td>${row[8]}</td>
                <td>R$ ${Number(row[6]).toFixed(2)}</td>
                <td><a href="${row[12]}" target="_blank">Compare preços aqui</a></td>
            `;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        resultDiv.appendChild(table);
    }
}

