import { useState } from "react";
import { useCart } from "../contexts/cartContext";
import { Button, Modal, TextInput, Label, Select } from "flowbite-react";
import { Link } from "react-router-dom";
import visa from '../assets/visa.svg';
import mastercard from '../assets/mastercard.svg';
import amex from '../assets/amex.svg';
import paypal from '../assets/paypal.svg';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Handle input change for text inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change for dropdown inputs
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckout = () => {
    setIsProcessing(true);
    
    // Simuler un traitement de commande
    setTimeout(() => {
      // Générer un ID de commande unique
      const newOrderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      setOrderId(newOrderId);
      
      // Sauvegarder la commande dans le localStorage
      // We're removing the unused 'user' variable
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      
      const newOrder = {
        id: newOrderId,
        date: new Date().toISOString(),
        items: [...items],
        total: getCartTotal(),
        status: 'completed',
        shipping: orderDetails
      };
      
      orderHistory.push(newOrder);
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      
      // Finaliser le processus
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
      
    }, 2000);
  };
  
  const handleCloseOrderComplete = () => {
    setIsCheckoutModalOpen(false);
    setOrderComplete(false);
    window.location.href = '/';
  };

  if (items.length === 0) {
    return (
      <div className="container-flux mx-auto py-6 px-4 h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
        <div className=" p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-xl font-medium mt-4">Your cart is empty</h2>
          <p className="text-gray-500 mt-2">Looks like you haven't added any items to your cart yet.</p>
          <div className="flex justify-center">
            <Button 
              className="mt-6"
              onClick={() => window.location.href = '/#products'}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="container-flux h-screen mt-10 p-6 mx-auto px-4 py-32">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg flex shadow-sm overflow-hidden mb-6">
            {/* En-tête du tableau */}
            <div className="grid grid-cols-12 bg-gray-50 py-3 px-4 border-b">
              <div className="col-span-5 text-sm font-medium text-gray-700 uppercase">PRODUCT</div>
              <div className="col-span-5 text-sm font-medium text-gray-700 uppercase"></div>
              <div className="col-span-5 text-sm font-medium text-gray-700 uppercase"></div>
              <div className="col-span-2 text-sm font-medium text-gray-700 uppercase">PRICE</div>
              <div className="col-span-2 text-sm font-medium text-gray-700 uppercase">QUANTITY</div>
              <div className="col-span-2 text-sm font-medium text-gray-700 uppercase">TOTAL</div>
              <div className="col-span-1 text-sm font-medium text-gray-700 uppercase">ACTION</div>
            </div>
            
            {/* Corps du tableau */}
            {items.map((item) => (
              <div key={item.product.id} className="grid grid-cols-12 items-center py-4 px-4 border-b">
                <div className="col-span-5 flex items-center">
                  <div className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mr-4">
                    <img 
                      className="h-full w-full object-cover" 
                      src={item.product.image} 
                      alt={item.product.name} 
                    />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-800 font-medium">{item.product.name}</h3>
                    <p className="text-xs text-gray-500">{item.product.category}</p>
                  </div>
                </div>
                <div className="col-span-2 text-sm font-medium">${item.product.price}</div>
                <div className="col-span-2">
                  <div className="inline-flex border border-gray-300 rounded-md">
                    <button 
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <input
                      type="text"
                      className="w-8 border-0 text-center focus:ring-0"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value > 0) {
                          updateQuantity(item.product.id, value);
                        }
                      }}
                    />
                    <button 
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium">
                    ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="col-span-1">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <Link 
              to="/#products"
              className="flex items-center mx-4 text-indigo-600 hover:text-indigo-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Continue Shopping
            </Link>
            
            <Button 
              onClick={clearCart}
              color="failure"
              outline
            >
              Clear Cart
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-1">
        
          <div className="bg-gray rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${getCartTotal().toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            
            <div className="flex justify-between py-3 font-bold text-lg">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-center">
            <Button 
              onClick={() => setIsCheckoutModalOpen(true)}
              className=" mt-6"
              color="blue"
            >
              Proceed to Checkout
            </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de paiement et checkout */}
      <Modal
        show={isCheckoutModalOpen}
        size="xl"
        onClose={() => !isProcessing && !orderComplete && setIsCheckoutModalOpen(false)}
        popup={false}
      >
        <Modal.Header>
          {orderComplete ? 'Order Confirmation' : 'Checkout'}
        </Modal.Header>
        <Modal.Body>
          {orderComplete ? (
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mx-auto mb-4">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Thank you for your order!</h3>
              <p className="text-gray-500 mb-6">Your order has been successfully placed.</p>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
                <p className="text-sm font-medium">Order ID: <span className="font-normal">{orderId}</span></p>
                <p className="text-sm font-medium mt-2">Total Amount: <span className="font-normal">${getCartTotal().toFixed(2)}</span></p>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">
                A confirmation email has been sent to {orderDetails.email}. 
                We'll notify you once your order has been shipped.
              </p>
              
              <Button
                onClick={handleCloseOrderComplete}
                color="indigo"
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="max-h-[60vh] overflow-y-auto p-2">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Full Name" />
                    </div>
                    <TextInput
                      id="name"
                      name="name"
                      value={orderDetails.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      value={orderDetails.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="mb-2 block">
                      <Label htmlFor="address" value="Address" />
                    </div>
                    <TextInput
                      id="address"
                      name="address"
                      value={orderDetails.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="city" value="City" />
                    </div>
                    <TextInput
                      id="city"
                      name="city"
                      value={orderDetails.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="postalCode" value="Postal Code" />
                    </div>
                    <TextInput
                      id="postalCode"
                      name="postalCode"
                      value={orderDetails.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="mb-2 block">
                      <Label htmlFor="country" value="Country" />
                    </div>
                    <Select
                      id="country"
                      name="country"
                      value={orderDetails.country}
                      onChange={handleSelectChange}
                      required
                    >
                      <option value="">Select a country</option>
                      <option value="FR">France</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="DE">Germany</option>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Information</h3>
                
                <div className="flex space-x-4 mb-4">
                  <img src={visa} alt="Visa" className="h-8" />
                  <img src={mastercard} alt="Mastercard" className="h-8" />
                  <img src={amex} alt="American Express" className="h-8" />
                  <img src={paypal} alt="PayPal" className="h-8" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <div className="mb-2 block">
                      <Label htmlFor="cardNumber" value="Card Number" />
                    </div>
                    <TextInput
                      id="cardNumber"
                      name="cardNumber"
                      value={orderDetails.cardNumber}
                      onChange={handleInputChange}
                      placeholder="**** **** **** ****"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="expiryDate" value="Expiry Date" />
                    </div>
                    <TextInput
                      id="expiryDate"
                      name="expiryDate"
                      value={orderDetails.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="cvv" value="CVV" />
                    </div>
                    <TextInput
                      id="cvv"
                      name="cvv"
                      value={orderDetails.cvv}
                      onChange={handleInputChange}
                      placeholder="***"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Total:</span>
                  <span className="text-lg font-bold">${getCartTotal().toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  color="blue"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    `Pay $${getCartTotal().toFixed(2)}`
                  )}
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CartPage;