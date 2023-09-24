import { useState } from "react";
import Input from "../../components/input/Input"
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import { generatePassword } from "../../util/passwordGenerator";
import { useToast } from "../../components/notification-taost/ToastProvider";
import Server from "../../config/axios";
import { otpNumberValidation } from "../../util/validation";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate()
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [password, setPassword] = useState('')
  const [verified, setVerified] = useState(false)
  const [numbers, setNumbers] = useState(true)
  const [capitalLetters, setCapitalLetters] = useState(true)
  const [smallLetters, setSmallLetters] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [passwordLength, setPasswordLength] = useState(20)
  const [savedPasswords, setSavedPasswords] = useState([])
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const toast = useToast()
  const handlePasswordLength = (input) => {
    setPasswordLength(input.target.value);
  }
  const handleGeneratePassword = () => {
    if (!numbers && !symbols && !smallLetters && !capitalLetters) {
      return toast.open({ type: 'Error', content: "Please select atleast one option" })
    }
    const newPassword = generatePassword(passwordLength, numbers, symbols, smallLetters, capitalLetters)
    setPassword(newPassword)
  }

  const handleNumbers = () => {
    setNumbers((prev) => !prev)
  }
  const handleCapitalLetters = () => {
    setCapitalLetters(prev => !prev)
  }
  const handleSmallLetters = () => {
    setSmallLetters(prev => !prev)
  }
  const handleSymbols = () => {
    setSymbols(prev => !prev)
  }
  const handleOtpState = (e) => {
    setOtpError(otpNumberValidation(e.target.value))
    setOtp(e.target.value)
  }
  const handleSavePassword = () => {
    if (!user) {
      return toast.open({ type: 'Error', content: "Failed to save password please login" })
    }
    if (!password) {
      return toast.open({ type: 'Error', content: "Please generate password" })
    }
    Server.post('/api/password', {
      password,
    }).then((res) => {
      setSavedPasswords(prev => [...prev, res.data])
      return toast.open({ type: 'Success', content: "Succesfully saved password" })
    }).catch(() => {
      return toast.open({ type: 'Error', content: "Failed to save password" })
    })
  }

  const handleOtp = () => {
    const { phone } = user
    if (!phone) {
      navigate('/login')
      return toast.open({ type: 'Error', content: "Please login" })
    }
    Server.get('/api/auth/otp', {
      params: {
        phone
      }
    }).then((err) => {
      return toast.open({ type: 'Success', content: "An otp sent to your phone number " + phone })
    }).catch(() => {
      return toast.open({ type: 'Error', content: "Failed to sent otp" })
    })
  }

  const handleGetAllPassword = () => {
    Server.get('/api/password', {
      params: {
        otp
      }
    }).then(res => {
      setSavedPasswords(res.data)
      setVerified(true)
    }).catch((err) => {
      return toast.open({ type: 'Error', content: "Failed to load passwords" })
    })
  }
  const handleDeletePassword = (id) => {
    Server.delete('/api/password', {
      params: {
        question_id: id
      }
    }).then((res) => {
      setSavedPasswords(prev => prev.filter(data => data._id !== id))
      return toast.open({ type: 'Success', content: "Password successfully deleted" })
    }).catch(() => {
      return toast.open({ type: 'Error', content: "Failed to delete password" })
    })
  }
  return (
    <div className="h-[70%] grid md:grid-cols-1 lg:grid-cols-4 gap-4 m-auto ">
      <div className="left md:col-span-1 lg:col-span-2 flex items-center justify-center">
        <div className="generator h-[550px] w-[400px] border p-10 shadow-lg ">
          <div className="heading">
            <h4 className="font-mono">Generate Password</h4>
          </div>
          <div className="options flex-col">
            <div className="ml-2 flex">
              <Input type={'checkbox'} checked={numbers} InputFunction={handleNumbers} label={'Include Numbers'} />
            </div>
            <div className="ml-2">
              <Input type={'checkbox'} checked={capitalLetters} InputFunction={handleCapitalLetters} label={'Include capital letters'} />
            </div>
            <div className="ml-2">
              <Input type={'checkbox'} checked={smallLetters} InputFunction={handleSmallLetters} label={'Include small letters'} />
            </div>
            <div className="ml-2">
              <Input type={'checkbox'} checked={symbols} InputFunction={handleSymbols} label={'Include symbols'} />
            </div>
            <div className="ml-2">
              <Input type={'range'} label={`Password Length ${passwordLength}`} value={passwordLength} InputFunction={handlePasswordLength} />
            </div>
            <div className="ml-2">
              <Input type={'text'} disable={true} value={password} clipboard={true} label={`Password`} placeHolder={"Generated password"} InoputFunction={handlePasswordLength} />
            </div>
            <div className="ml-2 mt-4">
              <Button ButtonLabel={'Generate Password'} onclick={handleGeneratePassword} />
            </div>
            <div className="ml-2">
              <Button ButtonLabel={'Save Password'} onclick={handleSavePassword} />
            </div>
          </div>
        </div>
      </div>
      <div className="right md:col-span-1 lg:col-span-2 flex items-center justify-center">
        <div className="w-[400px] h-[550px] border p-10 shadow-lg overflow-y-scroll no-scrollbar scroll-smooth">
          {user ?
            verified ? <>
              <h4 className="font-mono">
                saved passwords
              </h4>
              {
                savedPasswords?.map(({ password, _id }, index) => <Card value={password} key={index} buttonFunction={() => handleDeletePassword(_id)} />)
              }
            </>
              :
              <div className="m-auto h-[90%] flex-col items-center justify-center">
                <h4 className="font-mono">
                  To view the password you need to verify
                </h4>
                <Input placeHolder={"Enter the otp"} value={otp} InputFunction={handleOtpState} type={'number'} name={'otp'} errorMessage={otpError} />
                <div className="mt-2"></div>
                <Button ButtonLabel={"Generate Otp"} onclick={handleOtp} />
                <Button ButtonLabel={"Get Passwords"} onclick={handleGetAllPassword} />
              </div>
            :
            <>
              <h4 className="font-mono">Please Login to view the password <br /><Link to={'/login'} className="text-blue-600">Login</Link></h4>
            </>
          }

        </div>
      </div>
    </div>
  )
}

export default Home