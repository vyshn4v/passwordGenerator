import Input from "../input/Input"

function Card() {
  return (
    <div className="w-100 my-2 flex items-center">
      <div className="password font-mono w-[70%]">
        <Input value={'ew9wef98fweiufhuu2hih2b3hb'} disable={true} clipboard={true}  />
      </div>
      <div className="actions w-[30%]">actions</div>
    </div>
  )
}

export default Card