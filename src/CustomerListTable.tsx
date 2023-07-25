import React from 'react';
import { Customer } from './CustomerList';

interface CustomerListTableParams {
  customers: Customer[];
}

const CustomerListTable = ({ customers }: CustomerListTableParams) => {
  return (
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
  );
};

export default CustomerListTable;