import React, { useState } from 'react'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import { useToast } from '../../components/notification-taost/ToastProvider'
import { useNavigate } from 'react-router-dom'
import Server from '../../config/axios'
import { nameValidation, otpNumberValidation, phoneNumberValidation } from '../../util/validation'

function Signup() {
    const toast = useToast()
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [otp, setOtp] = useState('')
    const [otpError, setOtpError] = useState('')
    const [fetchOtp, setFetchOtp] = useState(false)
    const navigate = useNavigate()

    const handleLogin = () => {
        if (!phone || !otp || !name) {
            return toast.open({ type: 'Error', content: "Phone or otp is missing" })
        }
        Server.post('/api/auth/signup', { phone, name, otp })
            .then((res) => {
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
            return null
        }
        Server.get('/api/auth/otp', {
            params: {
                phone
            }
        }).then(() => {
            toast.open({ type: 'Success', content: "An otp sent to your phone number " + phone })
        }).catch(() => {
            toast.open({ type: 'Error', content: "Failed to sent otp" })
        })
    }
    const handlePhoneNumber = (e) => {
        setPhone(e.target.value)
        setPhoneError(phoneNumberValidation(e.target.value))
    }
    const handleName = (e) => {
        setName(e.target.value)
        setNameError(nameValidation(e.target.value))
    }
    const handleOtp = (e) => {
        setOtp(e.target.value)
        setOtpError(otpNumberValidation(e.target.value))
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-500/60 via-violet-600/60 to-violet-950/60 ">
            <div className="login-form shadow-md p-10 border bg-white " >
                <div className="mt-5 ">
                    <span className='font-bold font-mono'>signup To Password Generator</span>
                </div>
                <Input label={'Name'} InputFunction={handleName} value={name} name={'name'} type={'text'} placeHolder={"Enter the name"} errorMessage={nameError} />
                <div className='mt-2'></div>
                <Input label={'Phone'} InputFunction={handlePhoneNumber} value={phone} name={'phone'} type={'number'} placeHolder={"Enter the phone number"} errorMessage={phoneError} />
                <div className='mt-2'></div>
                <Button ButtonLabel={'Generate otp'} onclick={handleOtpRequest} />
                <Input label={'Otp'} InputFunction={handleOtp} value={otp} placeHolder={"Enter the otp"} name={'otp'} type={'number'} errorMessage={otpError} />
                <div className='mt-2'></div>
                <Button ButtonLabel={'Login'} onclick={handleLogin} />
            </div>
        </div>
    )
}

export default Signup