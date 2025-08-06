import { useState } from "react";

const locations = Array(8).fill({
    title: "NEW JERSEY, NORTH AMERICA",
    company: "Espire Technologies, Inc.",
    address:
      "2500 Plaza 5, 25th floor\nHarborside Financial Center\nJersey City, NJ 07311",
    phones: ["+1 (201) 633–4723", "+1 (201) 484–7201"],
    email: "sales.us@espire.com",
  });

export default function Globalcards() {
  const [locationData, setlocationData] = useState(locations);
  return (
    <section className="py-10 global-card">
      <div className="container mx-auto">
        <h2 className="mb-6">Contact Us</h2>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {locationData.map((location, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-md border ${
                idx % 2 === 0
                  ? "cart-blue"
                  : "cart-gray"
              }`}
            >
              <h3 className="mb-2">{location.title}</h3>
              <p
                className={`mb-1 ${
                  idx % 2 === 0 ? "" : "text-blue-600"
                }`}
              >
                {location.company}
              </p>
              <p className="whitespace-pre-line mb-2">
                {location.address}
              </p>
              {location.phones.map((phone, i) => (
                <p className="text-sm mb-1" key={i}>
                  {phone}
                </p>
              ))}
              <p
                className={`mt-2 ${
                  idx % 2 === 0 ? "text-white" : "text-black"
                }`}
              >
                <a href={`mailto:${location.email}`}>{location.email}</a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
