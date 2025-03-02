import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import shoesImage from '../assets/shoess.png'
import scrollToSection from "../components/scrollSection";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <section className="bg-gray-50 py-10 sm:py-16 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Message personnalisé si utilisateur connecté */}
        {user && (
          <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Bienvenue, <span className="font-bold">{user.name}</span>! Découvrez nos dernières offres sélectionnées pour vous.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base font-semibold uppercase tracking-wider text-blue-600">
              Step up your style with us
            </p>
            <h1 className="mt-4 text-4xl font-bold text-black sm:text-6xl lg:mt-8 xl:text-5xl">
              Welcome to Kiraroshop where comfort and style unite.
            </h1>
            <p className="mt-4 text-base text-black sm:text-xl lg:mt-8">
              Find shoes that blend comfort and style for any occasion
            </p>

            <Button
              onClick={() => scrollToSection("products")}
              color="yellow"
              className="mt-8 inline-flex items-center rounded-full bg-yellow-300 px-6 py-4 font-semibold text-black hover:bg-yellow-400 focus:bg-yellow-400 lg:mt-16"
              role="button"
            >
              Our products
              <svg
                className="-mr-2 ml-8 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Button>

            {/* Modification du texte selon l'état de connexion */}
            {!user ? (
              <p className="mt-5 text-gray-600">
                Already joined us?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    // Ici, vous pourriez appeler une fonction pour naviguer vers login
                  }}
                  className="text-black transition-all duration-200 hover:underline"
                >
                  Log in
                </a>
              </p>
            ) : (
              <p className="mt-5 text-gray-600">
                Explore your{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Fonctionnalité à implémenter');
                  }}
                  className="text-black transition-all duration-200 hover:underline"
                >
                  purchase history
                </a>{" "}
                or check your{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Fonctionnalité à implémenter');
                  }}
                  className="text-black transition-all duration-200 hover:underline"
                >
                  recommendations
                </a>
              </p>
            )}
          </div>
          <div>
            <img className="w-full" src={shoesImage} alt="Shoes" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;