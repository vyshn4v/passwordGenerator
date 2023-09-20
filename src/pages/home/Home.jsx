import { useState } from "react";
import Input from "../../components/input/Input"
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
function Home() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(0)
  const handlePasswordLength = (input) => {
    setPasswordLength(input.target.value);
  }
  return (
    <div className="h-[70%] grid md:grid-cols-1 lg:grid-cols-4 gap-4 m-auto ">
      <div className="left md:col-span-1 lg:col-span-2 flex items-center justify-center">
        <div className="generator h-[400px] w-[400px] border p-10 shadow-lg bg-white ">
          <div className="heading">
            <h4 className="font-mono">Generate Password</h4>
          </div>
          <div className="options flex flex-wrap">
            <div className="ml-2 flex">
              <Input type={'checkbox'} label={'Number[1-10]'} />
            </div>
            <div className="ml-2">
              <Input type={'checkbox'} label={'Alphabets[A-z,a-z]'} />
            </div>
            <div className="ml-2">
              <Input type={'checkbox'} label={'Symbols[`!@#$]'} />
            </div>
            <div className="ml-2">
              <Input type={'range'} label={`Password Length ${passwordLength}`} InoputFunction={handlePasswordLength} />
            </div>
            <div className="ml-2">
              <Input type={'text'} disable={true} value={password} clipboard={true} label={`Password`} placeHolder={"Generated password"} InoputFunction={handlePasswordLength} />
            </div>
            <div className="ml-2 mt-4">
              <Button ButtonLabel={'Generate Password'} />
            </div>
          </div>
        </div>
      </div>
      <div className="right md:col-span-1 lg:col-span-2 flex items-center justify-center">
        <div className="h-[400px] w-[400px] border p-10 shadow-lg bg-white ">
          <h4 className="font-mono">
            saved passwords
          </h4>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

export default Home