import Input from "../input/Input"

function Card({ value,buttonFunction }) {
  return (
    <div className="w-100 my-2 flex items-center ">
      <div className="password font-mono w-[70%]">
        <Input value={value} disable={true} clipboard={true} />
      </div>
      <div className="actions w-[30%] flex items-center justify-end">
        <button onClick={buttonFunction}>
          <svg className="w-6 h-6 text-white hover:text-red-500  cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Card