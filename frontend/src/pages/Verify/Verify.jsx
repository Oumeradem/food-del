import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const { url } = useContext(StoreContext);
    const navigate = useNavigate()

    const verifyPayment = async () => {
        // Send payment result to backend for verification
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        if (response.data.success) {
            // Payment confirmed: go to orders page
            navigate("/myorders")
        }
        else {
            // Payment failed or cancelled: go back to home
            navigate("/")

        }
    }

    useEffect(() => {
        verifyPayment();

    }, [])

    return (
        <div className='verify'>
            <div className="spinner"></div>

        </div>
    )
}

export default Verify
