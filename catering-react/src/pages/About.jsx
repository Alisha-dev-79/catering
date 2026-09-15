export default function About() {
    return (
      <div>
        <section className="bg-gray-900 text-white py-16 text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="text-gray-300 mt-2">Know more about Starter Station</p>
        </section>
  
        <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/images/about-catering.jpg"
            alt="About Starter Station"
            className="rounded-2xl shadow-lg w-full h-[420px] object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Starter Station began with one simple idea — every event deserves
              food that people remember. What started as a small home catering
              service has grown into a full-fledged catering company serving
              weddings, birthdays, corporate events and everything in between.
            </p>
            <p className="text-gray-600 mb-4">
              Our team of experienced chefs specializes in a wide range of
              cuisines, from traditional Indian classics to modern fusion dishes.
              Every dish is prepared with fresh ingredients and genuine care.
            </p>
            <p className="text-gray-600">
              We believe catering is more than just food — it's about creating
              an experience your guests will talk about long after the event ends.
            </p>
          </div>
        </section>
  
        <section className="bg-brand-50 py-16">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
            {[
              { title: "500+", desc: "Events Catered" },
              { title: "50+", desc: "Menu Items" },
              { title: "10+", desc: "Years of Experience" },
            ].map((stat) => (
              <div key={stat.desc} className="bg-white rounded-2xl shadow p-8">
                <h3 className="text-4xl font-extrabold text-brand-600">{stat.title}</h3>
                <p className="text-gray-600 mt-2">{stat.desc}</p>
              </div>
            ))}
          </div>
        </section>
  
        <section className="max-w-5xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To deliver exceptional food and service for every occasion, building
            lasting relationships with our clients through quality, consistency,
            and genuine hospitality.
          </p>
        </section>
      </div>
    );
  }