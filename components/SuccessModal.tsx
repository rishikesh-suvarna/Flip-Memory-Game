import React from 'react'

const SuccessModal = ({
    title,
    message,
    onClickHandler,
    buttonLabel
}: {
    title: string,
    message: string,
    onClickHandler: () => void,
    buttonLabel: string
}) => {
    return (
        <div className="z-20 modal fixed w-full h-full backdrop-blur-sm top-0 left-0 flex items-center justify-center transition-all" role='dialog'>
            <div className="modal-content text-white bg-slate-950 p-4 w-full sm:w-1/2 rounded-md">
                <h2 className='text-3xl md:text-7xl font-light text-center'>{title}</h2>
                <p className='text-center text-xl mt-2'>{message}</p>
                <button onClick={onClickHandler} className='mt-8 p-2 w-full bg-slate-800 text-white'>{buttonLabel}</button>
            </div>
        </div>
    )
}

export default SuccessModal