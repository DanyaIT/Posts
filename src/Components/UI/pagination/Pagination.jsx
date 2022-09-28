import React from 'react'
import { getArrayPages } from '../../../utils/pages';

const Pagination = ({totalPages, pages, changePage}) => {
    let pagesArray = getArrayPages(totalPages);
    return (
    <div className="page__wraper">
        {pagesArray.map(p => (
          <span 
          onClick = {()=> changePage(p)}
          key={p}
          className={pages === p ? "page page__active" : "page"}>{p}
          </span>
        ))}
      </div>
  )
}

export default Pagination

