import { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.js';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const { url } = useContext(StoreContext);
    const navigate = useNavigate()

    useEffect(() => {
        const verifyPayment = async () => {
            // Send payment result to backend for verification
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            if (response.data.success) {
                // Payment confirmed: go to orders page with a thank-you message
                navigate("/myorders", { state: { paymentSuccess: true } })
            }
            else {
                // Payment failed or cancelled: go back to home
                navigate("/")

            }
        };
        verifyPayment();
        // Run once on mount; success/orderId come from the URL query params.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='verify'>
            <div className="spinner"></div>

        </div>
    )
}

export default Verify
