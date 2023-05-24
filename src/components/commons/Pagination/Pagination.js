import React, { useState } from "react";
import styles from './Pagination.module.css';

let Pagination = ({portionSize=10,...props}) => {
        let pagesCount = Math.ceil (props.totalUsersCount/props.pageSize)
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        
        let portionCount = Math.ceil (pagesCount/portionSize)
        let [portionNumber,setPortionNumber] = useState(1)
        let leftPortionPageNumber = (portionNumber-1)*portionSize+1
        let rightPortionPageNumber = portionNumber*portionSize
        
        return (
            <div>
                {(portionNumber>1) && 
                <button onClick={()=> {setPortionNumber(portionNumber-1)}}>Prev</button>}
                
                {pages.filter(p=> p>=leftPortionPageNumber && p<=rightPortionPageNumber)
                .map (p => {
                    return <span onClick={() => { props.onPageChanged(p)}} className = {props.currentPage === p && styles.selectedPage}>{p}</span>
                })
                }
                {portionNumber<portionCount && 
                <button onClick={()=> {setPortionNumber(portionNumber+1)}}>Next</button>}
            </div>
        )
           
    }
    

    
    

export default Pagination;