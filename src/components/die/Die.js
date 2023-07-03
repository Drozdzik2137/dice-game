import React from 'react'
import './Die.css'

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : 'white'
    }
    return (
        <div className='cube m-2' style={styles} onClick={props.holdDice}>
            {props.value === 1 && 
                <div className='die-face d-flex justify-content-center align-items-center h-100'>
                    <div className='dot'></div>
                </div>
            }
            {props.value === 2 && 
                // <div className='die-face d-flex justify-content-between h-100'>
                //     <div className='dot align-self-start m-2'></div>
                //     <div className='dot align-self-end m-2'></div>
                // </div>

                // <div className='die-face d-flex align-items-stretch h-100'>
                //     <div className='w-50 d-flex flex-column align-self-start'>
                //         <div className='dot m-3'></div>
                //     </div>
                //     <div className='w-50 d-flex flex-column align-self-end'>
                //         <div className='dot m-3'></div>                
                //     </div>
                // </div>
                
                <div className='die-face d-flex justify-content-between flex-column h-100'>
                    <div className='w-100 d-flex justify-content-start'>
                        <div className='dot mt-3 ms-3'></div>
                    </div>
                    <div className='w-100 d-flex justify-content-end'>
                        <div className='dot mb-3 me-3'></div>
                    </div>
                </div>
            }
            {props.value === 3 && 
                // <div className='die-face d-flex justify-content-between h-100'>
                //     <div className='dot align-self-start m-2'></div>
                //     <div className='dot align-self-center m-2'></div>
                //     <div className='dot align-self-end m-2'></div>
                // </div>
                <div className='die-face d-flex justify-content-between flex-column h-100'>
                    <div className='w-100 d-flex justify-content-start'>
                        <div className='dot mt-3 ms-3'></div>
                    </div>
                    <div className='w-100 d-flex justify-content-center'>
                        <div className='dot m-auto'></div>
                    </div>
                    <div className='w-100 d-flex justify-content-end'>
                        <div className='dot mb-3 me-3'></div>
                    </div>
                </div>
            }
            {props.value === 4 && 
                // <div className='die-face d-flex justify-content-between flex-column h-100'>
                //     <div className='w-100 align-self-start d-flex justify-content-between'>
                //         <div className='dot m-2'></div>
                //         <div className='dot m-2'></div>
                //     </div>
                //     <div className='w-100 align-self-end d-flex justify-content-between'>
                //         <div className='dot m-2'></div>
                //         <div className='dot m-2'></div>                   
                //     </div>
                // </div>
                <div className='die-face d-flex justify-content-between flex-column h-100'>
                    <div className='w-100 d-flex justify-content-center'>
                        <div className='dot mt-3 mx-3'></div>
                        <div className='dot mt-3 mx-3'></div>
                    </div>
                    <div className='w-100 d-flex justify-content-center'>
                        <div className='dot mb-3 mx-3'></div>
                        <div className='dot mb-3 mx-3'></div>
                    </div>
                </div>
            }
            {props.value === 5 && 
                // <div className='die-face d-flex justify-content-between flex-column h-100'>
                //     <div className='w-100 align-self-start d-flex justify-content-between'>
                //         <div className='dot m-2'></div>
                //         <div className='dot m-2'></div>
                //     </div>
                //     <div className='w-100 align-self-center d-flex justify-content-center'>
                //         <div className='dot m-2'></div>
                //     </div>
                //     <div className='w-100 align-self-end d-flex justify-content-between'>
                //         <div className='dot m-2'></div>
                //         <div className='dot m-2'></div>
                //     </div>
                // </div>
                <div className='die-face d-flex justify-content-between flex-column h-100'>
                    <div className='w-100 d-flex justify-content-center'>
                        <div className='dot mt-3 mx-3'></div>
                        <div className='dot mt-3 mx-3'></div>
                    </div>
                    <div className='w-100 d-flex justify-content-center'>
                        <div className='dot m-auto'></div>
                    </div>
                    <div className='w-100 d-flex justify-content-center'>
                        <div className='dot mb-3 mx-3'></div>
                        <div className='dot mb-3 mx-3'></div>
                    </div>
                </div>
            }
            {props.value === 6 && 
                // <div className='die-face d-flex align-items-stretch h-100'>
                //     <div className='w-50 d-flex flex-column'>
                //         <div className='dot m-auto'></div>
                //         <div className='dot m-auto'></div>
                //         <div className='dot m-auto'></div>
                //     </div>
                //     <div className='w-50 d-flex flex-column'>
                //         <div className='dot m-auto'></div>
                //         <div className='dot m-auto'></div>
                //         <div className='dot m-auto'></div>                    
                //     </div>
                // </div>

                <div className='die-face d-flex justify-content-between flex-column h-100'>
                    <div className='w-100 d-flex justify-content-center'>
                        <div className='dot mt-3 mx-3'></div>
                        <div className='dot mt-3 mx-3'></div>
                    </div>
                    <div className='w-100 d-flex justify-content-center'>
                        <div className='dot m-auto'></div>
                        <div className='dot m-auto'></div>
                    </div>
                    <div className='w-100 d-flex justify-content-center'>
                        <div className='dot mb-3 mx-3'></div>
                        <div className='dot mb-3 mx-3'></div>
                    </div>
                </div>
            }
        </div>
    )
}