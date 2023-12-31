import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Server from '../../config/axios'
import { useState } from 'react'
import { useToast } from '../../components/notification-taost/ToastProvider'
import { otpNumberValidation, phoneNumberValidation } from '../../util/validation'
import { Link, useNavigate } from 'react-router-dom'
function Login() {
    const toast = useToast()
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [otp, setOtp] = useState('')
    const [otpError, setOtpError] = useState('')
    const [fetchOtp, setFetchOtp] = useState(false)
    const navigate = useNavigate()
    const handleLogin = () => {
        if (!phone || !otp) {
            return toast.open({ type: 'Error', content: "Phone or otp is missing" })
        }
        Server.get('/api/auth/login', {
            params: {
                phone: phone,
                otp: otp
            }
        }).then((res) => {
            console.log(res);
            toast.open({ type: 'Success', content: "Login success" })
            sessionStorage.setItem('user', JSON.stringify(res.data))
            navigate('/')
        }).catch((err) => {
            console.log(err);
            toast.open({ type: 'Error', content: "Login failed" })
        })
    }
    const handleOtpRequest = () => {
        const valid = phoneNumberValidation(phone)
        setPhoneError(valid)
        if (valid) {
            setFetchOtp(false)
            return null
        }
        Server.get('/api/auth/otp', {
            params: {
                phone: phone
            }
        }).then(() => {
            toast.open({ type: 'Success', content: "An otp sent to your phone number" })
        }).catch(() => {
            toast.open({ type: 'Error', content: "Failed to sent otp" })
        })
    }
    const handlePhoneNumber = (e) => {
        setPhone(e.target.value)
        setPhoneError(phoneNumberValidation(e.target.value))
    }
    const handleOtp = (e) => {
        setOtp(e.target.value)
        setOtpError(otpNumberValidation(e.target.value))
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-500/60 via-violet-600/60 to-violet-950/60 ">
            <div className="login-form shadow-md p-10 border bg-white " >
                <div className="mt-5 ">
                    <span className='font-bold font-mono'>Login To Password Generator</span>
                </div>
                <Input label={'Phone'} InputFunction={handlePhoneNumber} value={phone} name={'phone'} type={'number'} placeHolder={"Enter the phone number"} errorMessage={phoneError} />
                <div className='mt-2'></div>
                <Button ButtonLabel={'Generate otp'} onclick={handleOtpRequest} />
                <Input label={'Otp'} InputFunction={handleOtp} value={otp} placeHolder={"Enter the otp"} name={'otp'} type={'number'} errorMessage={otpError} />
                <div className='mt-2'></div>
                <Button ButtonLabel={'Login'} onclick={handleLogin} />
                <div className='mt-2'><h6 className='font-mono'>don't have an account? <Link to={'/signup'} className='text-blue-500'>Signup</Link></h6></div>
            </div>
        </div>
    )
}

export default Login