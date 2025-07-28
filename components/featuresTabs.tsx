import { useState } from "react";
import parse from "html-react-parser";

const featuresData = {
  Cookie: {
    title: "What Are Cookies & What Do They Do?",
    content: `<h3>What Are Cookies & What Do They Do?</h3><p>
                A cookie is a small piece of data (text file) consisting of
                letters and numbers that a website downloads to your computer or
                device to recognize you as a user when you return to the website
                using the same computer/device and web browser. Cookies can help
                a website to arrange content to match users’ preferred interests
                more effectively or avoid the need for users to re-enter data
                when they revisit a website. This can help speed up your login
                time or customize the layout of pages according to your needs
                and preferences. Cookies are used by millions of the most
                popular websites on the internet and do not harm your computer.
                “Essential” cookies enable the services we offer.
                “Non-Essential” cookies help us understand how our services are
                being used (i.e. analytics) and deliver advertisements
              </p><h4>What are cookies on websites?</h4><p>
                Cookies are small pieces of data that websites store on a user's
                device, typically in the user's web browser, when they visit the
                site. These data files serve various purposes, and they play a
                crucial role in enhancing the functionality and user experience
                of websites. Cookies can be divided into different types based
                on their functions:
              </p><ol><li><strong>Session Cookies</strong>: These are temporary cookies that are stored
                  in the browser's memory during a user's visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li><li><strong>Persistent Cookies</strong>: These are temporary cookies that are stored
                  in the browser's memory during a user's visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li><li>
                  <strong>First-Party Cookies</strong>: These are temporary cookies that are stored
                  in the browser's memory during a user's visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li><li>
                  <strong>Third-Party Cookies</strong>: These are temporary cookies that are stored
                  in the browser's memory during a user's visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li>
              </ol>

              <ul>
                <li>
                  <strong>Session Cookies</strong>: These are temporary cookies that are stored
                  in the browser's memory during a user's visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li>
                <li>
                  <strong>Persistent Cookies</strong>: These are temporary cookies that are stored
                  in the browser's memory during a user's visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li>
                <li>
                  <strong>First-Party Cookies</strong>: These are temporary cookies that are stored
                  in the browser's memory during a user's visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li>
                <li>
                  <strong>Third-Party Cookies</strong>: These are temporary cookies that are stored
                  in the browser's memory during a user's visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li>
              </ul>

              <p>
                Cookies are small pieces of data that websites store on a user's
                device, typically in the user's web browser, when they visit the
                site. These data files serve various purposes, and they play a
                crucial role in enhancing the functionality and user experience
                of websites. Cookies can be divided into different types based
                on their functions:
              </p>`,
  },
  DAM: {
    title: "Digital Asset Management",
    content: "Content for DAM goes here...",
  },
  Maps: {
    title: "Maps Integration",
    content: "Content for Maps goes here...",
  },
  "Search-Results": {
    title: "Search Results",
    content: "Content for Search Results goes here...",
  },
  Personalization: {
    title: "Personalization Features",
    content: "Content for Personalization goes here...",
  },
  "External Api Results": {
    title: "External API Results",
    content: "Content for External APIs goes here...",
  },
};

export default function FeaturesTabs() {
  const [activeTab, setActiveTab] = useState("Cookie");

  return (
    <section className="feature-section py-10">
      <div className="container mx-auto">
        <h2 className="font-bold mb-6">Features</h2>
        <div className="flex flex-col lg:flex-row bg-[var(--bg-gray)] rounded-md p-6">
          {/* Sidebar Tabs */}
          <div className="w-full lg:w-1/4 left-feature">
            <ul className="flex lg:flex-col">
              {Object.keys(featuresData).map((tab) => (
                <li
                  key={tab}
                  className={`cursor-pointer px-4 py-4 text-sm font-medium  ${
                    activeTab === tab ? "bg-white text-black" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>

          {/* Content Area */}
          <div className="w-full lg:w-3/4 p-6 bg-white">
            <div className="prose prose-sm  max-w-none whitespace-pre-line">
              {/* {parse(featuresData[activeTab].content)} */}
              <h3 className="heading-bottom-line"><span>What Are Cookies & What Do They Do?</span></h3><p>
                A cookie is a small piece of data (text file) consisting of
                letters and numbers that a website downloads to your computer or
                device to recognize you as a user when you return to the website
                using the same computer/device and web browser. Cookies can help
                a website to arrange content to match users&apos; preferred interests
                more effectively or avoid the need for users to re-enter data
                when they revisit a website. This can help speed up your login
                time or customize the layout of pages according to your needs
                and preferences. Cookies are used by millions of the most
                popular websites on the internet and do not harm your computer.
                “Essential” cookies enable the services we offer.
                “Non-Essential” cookies help us understand how our services are
                being used (i.e. analytics) and deliver advertisements
              </p><h4>What are cookies on websites?</h4><p>
                Cookies are small pieces of data that websites store on a user&apos;s
                device, typically in the user&rsquo;s web browser, when they visit the
                site. These data files serve various purposes, and they play a
                crucial role in enhancing the functionality and user experience
                of websites. Cookies can be divided into different types based
                on their functions:
              </p><ol><li><strong>Session Cookies</strong>: These are temporary cookies that are stored
                  in the browser&rsquo;s memory during a user&rsquo;s visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li><li><strong>Persistent Cookies</strong>: These are temporary cookies that are stored
                  in the browser&rsquo;s memory during a user&rsquo;s visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li><li>
                  <strong>First-Party Cookies</strong>: These are temporary cookies that are stored
                  in the browser&rsquo;s memory during a user&rsquo;s visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li><li>
                  <strong>Third-Party Cookies</strong>: These are temporary cookies that are stored
                  in the browser&rsquo;s memory during a user&rsquo;s visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li>
              </ol>

              <ul>
                <li>
                  <strong>Session Cookies</strong>: These are temporary cookies that are stored
                  in the browser&rsquo;s memory during a user&rsquo;s visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li>
                <li>
                  <strong>Persistent Cookies</strong>: These are temporary cookies that are stored
                  in the browser&rsquo;s memory during a user&rsquo;s visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li>
                <li>
                  <strong>First-Party Cookies</strong>: These are temporary cookies that are stored
                  in the browser&rsquo;s memory during a user&rsquo;s visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li>
                <li>
                  <strong>Third-Party Cookies</strong>: These are temporary cookies that are stored
                  in the browser&rsquo;s memory during a user&rsquo;s visit to a website.
                  They are often used to maintain user sessions, remembering
                  information as a user navigates through the site. Session
                  cookies are typically deleted when the user closes their web
                  browser.
                </li>
              </ul>

              <p>
                Cookies are small pieces of data that websites store on a user&rsquo;s
                device, typically in the user&rsquo;s web browser, when they visit the
                site. These data files serve various purposes, and they play a
                crucial role in enhancing the functionality and user experience
                of websites. Cookies can be divided into different types based
                on their functions:
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
