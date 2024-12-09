// frontend/src/components/UploadVoucher.jsx
import React, { useState } from 'react';
import axios from 'axios';

function UploadVoucher() {
  const [companyId, setCompanyId] = useState('');
  const [voucherType, setVoucherType] = useState('CREDITO_FISCAL');
  const [voucherNumber, setVoucherNumber] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [provider, setProvider] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL; 
  // Asegúrate que en tu .env del frontend tienes algo como:
  // VITE_API_URL="http://localhost:3001"
  // o la URL donde está desplegado tu backend.

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('company_id', companyId);
    formData.append('voucher_type', voucherType);
    formData.append('voucher_number', voucherNumber);
    formData.append('date', date);
    formData.append('amount', amount);
    formData.append('provider', provider);
    formData.append('pdf_file', pdfFile);
    formData.append('json_file', jsonFile);
    
    try {
      const token = localStorage.getItem('token'); // Ajustar según tu lógica de auth
      await axios.post(`${API_URL}/vouchers/purchase_with_files`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data' // axios usualmente lo setea automáticamente
        }
      });
      alert('Comprobante creado con éxito!');
    } catch (err) {
      console.error(err);
      alert('Error al crear el comprobante');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Comprobante de Compra con Archivos</h2>
      <div>
        <label>Empresa ID:</label>
        <input type="text" value={companyId} onChange={e=>setCompanyId(e.target.value)} />
      </div>
      <div>
        <label>Tipo de Comprobante:</label>
        <select value={voucherType} onChange={e=>setVoucherType(e.target.value)}>
          <option value="CREDITO_FISCAL">CREDITO_FISCAL</option>
          <option value="CONSUMIDOR_FINAL">CONSUMIDOR_FINAL</option>
        </select>
      </div>
      <div>
        <label>Número de Comprobante:</label>
        <input type="text" value={voucherNumber} onChange={e=>setVoucherNumber(e.target.value)} />
      </div>
      <div>
        <label>Fecha:</label>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </div>
      <div>
        <label>Monto:</label>
        <input type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} />
      </div>
      <div>
        <label>Proveedor:</label>
        <input type="text" value={provider} onChange={e=>setProvider(e.target.value)} />
      </div>
      <div>
        <label>Archivo PDF:</label>
        <input type="file" accept="application/pdf" onChange={e=>setPdfFile(e.target.files[0])} />
      </div>
      <div>
        <label>Archivo JSON:</label>
        <input type="file" accept="application/json" onChange={e=>setJsonFile(e.target.files[0])} />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default UploadVoucher;
