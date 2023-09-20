import Input from '../../components/input/Input'
import Button from '../../components/button/Button'

function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="login-form shadow-md p-10 border" >
                <div className="mt-5 ">
                    <span className='font-bold font-mono'>Login To Password Generator</span>
                </div>
                <Input label={'Email'} placeHolder={"Enter the email"} errorMessage={'Email is required'} />
                <Input label={'Password'} placeHolder={"Enter the password"} errorMessage={'Password is required'} />
                <div className='mt-5'></div>
                <Button label={'Login'} />
            </div>
        </div>
    )
}

export default Login