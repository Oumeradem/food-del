import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useLocation } from 'react-router-dom';

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const location = useLocation();
    const [showThanks, setShowThanks] = useState(location.state?.paymentSuccess === true);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data);
        console.log(response.data.data)
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
        // Clear the payment success state so the message only shows once
        if (location.state?.paymentSuccess) {
            window.history.replaceState({}, document.title)
        }
    }, [token])



    return (
        <div className='my-orders'>
            {showThanks && (
                <div className="payment-thankyou">
                    <div className="payment-thankyou-icon">✅</div>
                    <h2>THANK YOU FOR YOUR PAYMENT!</h2>
                    <p>Your order has been confirmed and is now being processed. You can track its status below.</p>
                    <button className="payment-thankyou-close" onClick={() => setShowThanks(false)}>Continue</button>
                </div>
            )}
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                }
                                else {
                                    return item.name + " x " + item.quantity + " , "
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>  &#x25cf;  </span><b>{order.status}</b></p>
                            <button onClick={fetchOrders} >Track Order</button>

                        </div>
                    )

                })}

            </div>
        </div>
    )
}

export default MyOrders





