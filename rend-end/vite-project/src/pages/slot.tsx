import React from 'react'
import { getSlots, getusers, bookedSlot } from "./services"
import { useNavigate } from 'react-router-dom'


function Slot() {
    const [slot, setSlot] = React.useState([])
    const [users, setUsers]: any = React.useState({})
    let navigate = useNavigate()

    const getSlotsall = async () => {
        try {
            let datas = await getSlots()
            setSlot(datas.data)
        } catch (error) {

        }
    }

    const getUsers = async () => {
        try {
            let datas = await getusers()
            setUsers(datas.data)
            console.log(datas.data)

        } catch (error) {

        }
    }

    const bookSlots = async (slotId: any) => {
        // let datas = await 
        let datas = {
            token: localStorage.getItem('token'),
            slotId: slotId
        }
        try {
            let ser = await bookedSlot(datas);
            if (ser) {
                getUsers()
            }


        } catch (error) {

        }
        console.log(datas)

    }

    React.useEffect(() => {
        getUsers()
        getSlotsall()
    }, [])


    return (
        <div className='page-contaiiner'>
            <h2 style={{textAlign:"center"}}>Slot booking</h2>
            <div style={{display:"flex", justifyContent:"center"}}>
            <button onClick={()=>{navigate('/bookedslots')}}>Go To Booked Slots</button>
            </div>
            <div className="page-body">
                
                <div className="headers">
                    <div>
                        {
                            <>
                                <h3 >{users.userName}</h3>
                                <h3> {users.userAmount}</h3>
                                <h3>{users._id}</h3>
                            </>
                        }

                    </div>
                </div>
                <div className="slots">
                    {
                        slot && slot.map((data: any, ind: any) => (
                            <div className="box" key={ind}>
                                <h2>{data.slotNo}</h2>
                                {
                                    users.userAmount &&
                                    users.userAmount >=100
                                      ? <>
                                        <input type="checkbox" onChange={() => bookSlots(data._id)} /></> : null
                                }
                                <p>price: 100</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Slot