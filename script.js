document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-barang');
    const tableBody = document.getElementById('bodytable-barang');
    const searchInput = document.getElementById('search-barang');

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate form before submitting data
        const validationResult = validateForm();
        if (validationResult.isValid) {
            const formData = new FormData(form);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            const existingIndex = findProductIndex(data.kode_barang);
            if (existingIndex !== -1) {
                // If product with the same code already exists, update it
                updateProduct(existingIndex, data);
            } else {
                // If product does not exist, add new data to the table
                addProductToTable(data);
            }
            
            // Reset form after submission
            form.reset();
        } else {
            // Show error messages for empty fields
            for (let fieldName of validationResult.emptyFields) {
                const fieldInput = document.getElementById(fieldName);
                fieldInput.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
                const errorMessage = document.createElement('span');
                errorMessage.textContent = 'This field is required.';
                errorMessage.style.color = 'red';
                errorMessage.className = 'error-message';
                if (!fieldInput.parentNode.querySelector('.error-message')) {
                    fieldInput.parentNode.appendChild(errorMessage);
                }
            }
        }
    });

    // Function to find product index by its code
    function findProductIndex(productCode) {
        const rows = tableBody.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            const codeColumn = rows[i].getElementsByTagName('td')[0];
            if (codeColumn) {
                const codeText = codeColumn.textContent || codeColumn.innerText;
                if (codeText === productCode) {
                    return i;
                }
            }
        }
        return -1;
    }

    // Function to update existing product
    function updateProduct(index, newData) {
        const row = tableBody.getElementsByTagName('tr')[index];
        row.innerHTML = `
            <td>${newData.kode_barang}</td>
            <td>${newData.nama_barang}</td>
            <td>${newData.tahun_dibuat}</td>
            <td>${newData.kategori}</td>
            <td>${newData.model_barang}</td>
            <td>${newData.jumlah_barang}</td>
            <td>${newData.harga_barang}</td>
            <td>${new Date().toLocaleString()}</td>
        `;
    }

    // Function to add new product to the table
    function addProductToTable(product) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.kode_barang}</td>
            <td>${product.nama_barang}</td>
            <td>${product.tahun_dibuat}</td>
            <td>${product.kategori}</td>
            <td>${product.model_barang}</td>
            <td>${product.jumlah_barang}</td>
            <td>${product.harga_barang}</td>
            <td>${new Date().toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    }

    // Function to validate form before submission
    function validateForm() {
        const kode_barang = document.getElementById('kode-barang').value.trim();
        const nama_barang = document.getElementById('nama-barang').value.trim();
        const tahun_dibuat = document.getElementById('tahun-dibuat').value.trim();
        const kategori = document.getElementById('kategori').value.trim();
        const model_barang = document.getElementById('model-barang').value.trim();
        const jumlah_barang = document.getElementById('jumlah-barang').value.trim();
        const harga_barang = document.getElementById('harga-barang').value.trim();
        
        const emptyFields = [];
        
        // Validate empty inputs
        if (kode_barang === '') {
            emptyFields.push('kode-barang');
        }
        if (nama_barang === '') {
            emptyFields.push('nama-barang');
        }
        if (tahun_dibuat === '') {
            emptyFields.push('tahun-dibuat');
        }
        if (model_barang === '') {
            emptyFields.push('model-barang');
        }
        if (jumlah_barang === '') {
            emptyFields.push('jumlah-barang');
        }
        if (harga_barang === '') {
            emptyFields.push('harga-barang');
        }
        
        return { isValid: emptyFields.length === 0, emptyFields };
    }

    // Function to search products by name
    function searchProduct() {
        const filter = searchInput.value.toUpperCase();
        const rows = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const nameColumn = rows[i].getElementsByTagName('td')[1];
            if (nameColumn) {
                const nameText = nameColumn.textContent || nameColumn.innerText;
                if (nameText.toUpperCase().indexOf(filter) > -1) {
                    rows[i].style.display = '';
                } else {
                    rows[i].style.display = 'none';
                }
            }       
        }
    }
});
