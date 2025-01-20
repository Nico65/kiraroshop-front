import  { useState } from 'react';

const PaymentInterface = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const handlePayment = () => {
    alert(`Paiement effectué via ${paymentMethod === 'creditCard' ? 'Carte de Crédit' : 'Mobile Money'}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Paiement</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Méthode de paiement</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="creditCard">Carte de Crédit</option>
            <option value="mobileMoney">Mobile Money</option>
          </select>
        </div>

        {paymentMethod === 'creditCard' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">Numéro de carte</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />

            <label className="block text-sm font-medium text-gray-700 mt-4">Date d'expiration</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="MM/AA"
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">Numéro Mobile Money</label>
            <input
              type="text"
              placeholder="+123 456 789"
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
        >
          Confirmer le Paiement
        </button>
      </div>
    </div>
  );
};

export default PaymentInterface;
