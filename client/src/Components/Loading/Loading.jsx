import React from 'react'
import './Loading.scss'
import {BarsScale} from'react-svg-spinners'

export default function Loading() {
  return (
    <div>
        <div className='blackscreen'>
               <div className='loader'>
                <div><BarsScale color="white" width='4rem' height="4rem"/> </div>
                <div className='loader-text'> Please wait</div>
               </div>
        </div>
    </div>
  )
}
