const LanguageSelector = () => {
  return (
    <div className="LanguageSelector">
      <div className="language-selector">
        <select
          aria-label="Default select example"
          className="w-[200] p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en-US">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
