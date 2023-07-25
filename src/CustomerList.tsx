import React, { useState, useEffect } from 'react';
import CustomerListTable from './CustomerListTable';

export interface Customer {
  name: string;
  address: string;
  postCode: string;
}

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isPostCodeLoading, setIsPostCodeLoading] = useState<boolean>(false);

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

  useEffect(() => {
    fetchCustomerData();
  }, []);

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
    setIsPostCodeLoading(true);
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
      }).finally(() => setIsPostCodeLoading(false));
  };

  return (
    <div className="customer-list-container">
      <h2>Klientų sąrašas</h2>
      <button style={{ marginRight: '10px' }} onClick={handleImportClick}>Importuoti klientus</button>
      <button style={{ marginRight: '10px' }} onClick={handleRefreshClick}>Atnaujinti pašto indeksus</button>
      {isPostCodeLoading && (<span>Atnaujinama</span>)}
      <CustomerListTable customers={customers} />
    </div>
  );
};

export default CustomerList;