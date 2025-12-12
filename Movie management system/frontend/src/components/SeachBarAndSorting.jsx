import React from 'react'
import "../style/SeachBarAndSorting.css"

const SeachBarAndSorting = () => {
  return (
    <div className='container searchingSortingContainer'>
        <h3 className='text-center mt-5 pb-1'>Movie <span style={{color:"#d2ff27"}}>Library</span></h3>
        <p className='text-center '>Browse, search, and manage your entire movie collection in one place</p>
        
        <div className="searchSortingContent mt-5 d-flex justify-content-between">
            <div className="searchBar">
                <input type="text" placeholder='Search movies....' />
            </div>

            <div className="sorting">
                <select name="" id="">
                    <option value="">All</option>
                    <option value="">All</option>
                    <option value="">All</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default SeachBarAndSorting
