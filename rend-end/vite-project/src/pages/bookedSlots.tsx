import React from 'react'
import { GetBookedSlots } from "./services"

function BookedSlots() {
    let token = localStorage.getItem('token')
    const [state, setState] = React.useState([])

    const getSlots = async () => {
        try {
            let serData = {
                token: token
            }
            let datas = await GetBookedSlots(serData)
            setState(datas.data)

        } catch (error) {

        }
    }

    React.useEffect(() => {
        getSlots()
    }, [])
    return (
        <div className='page-contaiiner'>
            <div className="page-body">
            
            <div className="slots">
                    {
                        state && state.map((data: any, ind: any) => (
                            <div className="box" key={ind}>
                                <h2>{ind+1}</h2>
                                <h3>{data.slotActive?"Active":"InActive"}</h3>
                            </div>
                        ))
                    }
                </div>
                </div>
        </div>

    )
}

export default BookedSlots