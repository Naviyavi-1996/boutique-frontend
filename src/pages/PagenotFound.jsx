import React from 'react'
import { Link } from 'react-router-dom'

function PagenotFound() {
  return (
    <div className='container-fluid'>
    <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-8 d-flex justify-content-center align-items-center flex-column'>
            <img src="https://webartdevelopers.com/blog/wp-content/uploads/2021/05/neon-404-page-not-found.gif" alt="no image" className='w-100' />
            <Link to={'/'}><button className='btn btn-success mt-3 rounded-0'>GO HOME</button></Link>
        </div>
        <div className='col-md-2'></div>
    </div>
</div>
  )
}

export default PagenotFound