import React from 'react'
import SeachBarAndSorting from '../components/SeachBarAndSorting'
import MovieCard from '../components/MovieCard'

const Movies = () => {
  return (
    <div className='ps-3 pe-3 ps-sm-0 pe-sm-0'>
      <SeachBarAndSorting />
      <MovieCard />
    </div>
  )
}

export default Movies
