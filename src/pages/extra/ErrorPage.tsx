import React from 'react'
import ErrorIcon from '../../assets/error.svg'
import './ErrorPage.css'

function ErrorPage(props: { error: string }) {
    return (
        <>
            <div className='ep'>
                <img src={ErrorIcon} />
                <div className='ep-error'>{props.error}</div>
                <p>Please return to the previous page</p>
            </div>
        </>
    )
}

export default ErrorPage