const SearchBox = () => {
  return (
    <>
      <form className="search-bar-default">
        <div className="search-bar flex items-center overflow-hidden">
          <button
            type="submit"
            id="search-btn"
            className="px-3 py-2 text-gray-600 hover:text-gray-800 hidden"
            aria-label="Search"
          >
            <i className="fa fa-search"></i>
          </button>
          <input
            type="text"
            placeholder="Type to search"
            aria-label="search bar"
            className={`w-[150px] focus:outline-none placeholder-white sm:w-[250px] text-[14px] lg:w-[35cqw] p-[7px] bg-[var(--royalblue)] border-white text-white border-solid border-[1px]`}
          />
        </div>
      </form>
    </>
  );
};

export default SearchBox;
