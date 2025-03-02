import { useState, useEffect } from 'react';
import icoImage from '../assets/ico.svg';
import { Button, Navbar, Dropdown, Avatar } from "flowbite-react";
import scrollToSection from './scrollSection';
import { useCart } from '../contexts/cartContext';

interface NavbarProps {
  onNavigate: (page: string) => void; 
}

interface User {
  username: string;
  name: string;
  email: string;
  avatar: string;
}

export function Component({ onNavigate }: NavbarProps) {
  const [user, setUser] = useState<User | null>(null);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  
  // Vérifier si l'utilisateur est connecté  
  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setUser(null);
    
    // Émettre un événement personnalisé
    const logoutEvent = new CustomEvent('userLogout');
    window.dispatchEvent(logoutEvent);
    
    // Rediriger vers la page d'accueil
    onNavigate("home");
    scrollToSection("home");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <Navbar fluid rounded>
        <Navbar.Brand href="#">
          <img src={icoImage} className="mr-3 h-6 sm:h-9" alt="Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Kiraroshop
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2 items-center gap-3">
          {user ? (
            <>
              {/* Icône panier pour utilisateur connecté */}
              <button 
                className="relative text-gray-700 hover:text-blue-700 transition-colors" 
                onClick={() => onNavigate("cart")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {/* Badge panier - maintenant dynamique */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Icône favoris pour utilisateur connecté */}
              <button 
                className="text-gray-700 hover:text-blue-700 transition-colors" 
                onClick={() => alert('Favoris à implémenter')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              
              {/* Menu utilisateur avec dropdown */}
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar 
                    alt={user.name} 
                    img={user.avatar} 
                    rounded
                    bordered
                    color="blue"
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user.name}</span>
                  <span className="block truncate text-sm font-medium">{user.email}</span>
                </Dropdown.Header>
                <Dropdown.Item onClick={() => alert('Profil à implémenter')}>
                  Mon profil
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onNavigate("orders")}>
                  Mes commandes
                </Dropdown.Item>
                <Dropdown.Item onClick={() => alert('Paramètres à implémenter')}>
                  Paramètres
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  Déconnexion
                </Dropdown.Item>
              </Dropdown>
            </>
          ) : (
            <Button onClick={() => onNavigate("login")}>Login</Button>
          )}
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          <Navbar.Link onClick={() => { scrollToSection("home"); onNavigate("home"); }}>Home</Navbar.Link>
          <Navbar.Link onClick={() => { scrollToSection("about"); onNavigate("about"); }}>About</Navbar.Link>
          <Navbar.Link onClick={() => { scrollToSection("products"); onNavigate("products"); }}>Products</Navbar.Link>
          <Navbar.Link onClick={() => { scrollToSection("contact"); onNavigate("contact"); }}>Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}