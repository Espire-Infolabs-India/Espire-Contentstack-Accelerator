const LanguageSelector = () => {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    localStorage.setItem("lang", selectedLang);

    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split("/").filter(Boolean);

    const supportedLocales = ["de", "fr", "en-US"];
    if (supportedLocales.includes(pathSegments[0])) {
      pathSegments.shift();
    }
    const newPath = `/${selectedLang}${
      pathSegments.length ? "/" + pathSegments.join("/") : ""
    }`;
    window.location.href = newPath;
  };

  return (
    <div className="LanguageSelector">
      <div className="language-selector">
        <select
          aria-label="Default select example"
          className="w-[200] p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleLanguageChange}
          value={
            typeof window !== "undefined"
              ? localStorage.getItem("lang") || "en-US"
              : "en-US"
          }
        >
          <option value="en-US">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
    </div>
  );
};

export const Login = () => {
  return (
    <div className="Login">
      <div className="login">
        <select
          aria-label="Login Functionality"
          className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Login</option>
          <option>Register</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;