import shoeImage from '../assets/shoe.jpg'
const About = () => {
  return (
    <section className="bg-gray-100 py-10 sm:py-16 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <img
              className="w-full rounded-lg shadow-lg"
              src={shoeImage}
              alt="About Us"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-black sm:text-5xl lg:text-5xl">
              About Kiraroshop
            </h2>
            <p className="mt-4 text-lg text-gray-700 sm:mt-8">
              {" "}
              At <strong>Kiraroshop</strong>, we believe that shoes are more than just
              footwear—they're an expression of your personality. Our mission is
              to provide stylish and comfortable shoes for every occasion,
              ensuring you always step out with confidence.{" "}
            </p>

            <p className="mt-4 text-lg text-gray-700 sm:mt-8">
              Founded with a passion for quality and innovation, Kiraroshop has
              grown into a trusted name for customers seeking both comfort and
              elegance. From casual sneakers to formal footwear, we have
              something for everyone.
            </p>

            <p className="mt-4 text-lg text-gray-700 sm:mt-8">
              Our commitment to sustainability and customer satisfaction drives
              everything we do. Join us in redefining the way the world shops
              for shoes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
