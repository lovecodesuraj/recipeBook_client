import React from 'react'

const SearchBar = () => {
    return <>
        <form className="searchForm">
            <input className="searchInput" type="text" placeholder="Enter Ingredients" value={query.query} onChange={(e) => { setQuery({ ...query, query: e.target.value }) }} />
            {/* onChange = {(e)=>{setQuery({...query,query:e.target.value})}} */}
            <button type="submit" onClick={handleSubmit} >Search</button>
        </form>
    </>
}

export default SearchBar