document.getElementById('generateTable').addEventListener('click', function() {
    const rows = parseInt(document.getElementById('rows').value);
    const columns = parseInt(document.getElementById('columns').value);
  
    if (rows > 0 && columns > 0) {
      generateTable(rows, columns);
    } else {
      alert('Please enter valid numbers for rows and columns.');
    }
  });
  
  function generateTable(rows, columns) {
    const table = document.getElementById('dynamicTable');
    table.innerHTML = ''; 
  
    for (let i = 0; i < rows; i++) {
      const row = document.createElement('tr');
  
      for (let j = 0; j < columns; j++) {
        const cell = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Row ${i + 1}, Col ${j + 1}`;
        input.classList.add('form-control');
        cell.appendChild(input);
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  }
  