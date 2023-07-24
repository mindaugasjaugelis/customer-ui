import React, { useState, useEffect } from 'react';

interface Customer {
  name: string;
  address: string;
  postCode: string;
}

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = () => {
    fetch(process.env.REACT_APP_API_URL + '/Customer/Get')
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.success ? data.list : []);
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

  const handleImportClick = () => {
    fetch(process.env.REACT_APP_API_URL + '/Customer/Import', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.success){
            fetchCustomerData();
        } else {
            alert('Importuojant duomenis įvyko klaida');
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

  const handleRefreshClick = () => {
    fetch(process.env.REACT_APP_API_URL + '/Customer/RefreshPostCode', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.success){
            fetchCustomerData();
        } else {
            alert('Atnaujinant pašto indeksus įvyko klaida');
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

  return (
    <div className="customer-list-container">
      <h2>Klientų sąrašas</h2>
      <button style={{ marginRight: '10px' }} onClick={handleImportClick}>Importuoti klientus</button>
      <button onClick={handleRefreshClick}>Atnaujinti pašto indeksus</button>
      <table className="customer-table">
        <thead>
          <tr>
            <th style={{ width: '300px ' }}>Vardas</th>
            <th>Adresas</th>
            <th>Pašto kodas</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.name}>
              <td>{customer.name}</td>
              <td>{customer.address}</td>
              <td>{customer.postCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;