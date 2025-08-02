import React, { useEffect, useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';
import { AuthContext } from '../Provider/AuthProvider';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const FundingPage = () => {
  const [fundings, setFundings] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [amount, setAmount] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:3000/fundings')
      .then(res => setFundings(res.data))
      .catch(err => console.error(err));
  }, []);

  const totalFunds = fundings.reduce((sum, fund) => sum + fund.amount, 0);

  const handleCheckoutClick = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return alert("Please enter a valid amount before proceeding.");
    }
    setShowCheckout(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Total Funding: ${totalFunds}</h1>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="border px-3 py-2 rounded"
          />
          <button onClick={handleCheckoutClick} className="bg-blue-500 text-white px-4 py-2 rounded">
            Give Fund
          </button>
        </div>
      </div>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {fundings.map((fund, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{fund.name}</td>
              <td className="border p-2">৳ {fund.amount}</td>
              <td className="border p-2">{new Date(fund.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCheckout && (
        <div className="mt-6">
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={parseFloat(amount)} onSuccess={() => {
              setShowCheckout(false);
              setAmount('');
              axios.get('http://localhost:3000/fundings') // Refresh data
                .then(res => setFundings(res.data));
            }} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default FundingPage;
