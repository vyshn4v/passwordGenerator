import Success from '../notification-taost/Success';
import { useToast } from '../notification-taost/ToastProvider'
import './Login.scss'
// import PropTypes from 'prop-types';
function Input({ label, placeHolder, errorMessage, type, inputId, InputFunction, value, disable, clipboard,checked,name }) {
    const types = ["checkbox", "range"].includes(type)
    const toast = useToast()
    const handleClipboard = (value) => {
        if (value) {
            navigator.clipboard.writeText(value)
            return toast.open({ type: 'Success', content: "Password copied to clipboard" })
        }
        return toast.open({ type: 'Error', content: "Please generate password to copy" })
    }
    return (
        <div className={`${types ? 'mt-5 flex' : 'mt-5'}`}>
            <label htmlFor="email" className="block mb-2 mr-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <div className='flex items-center'>
                <input onChange={InputFunction} name={name} type={type} value={value} checked={checked} id={inputId} min={types ? "6" : ''} max={types ? "20" : ''} defaultValue={type ? 0 : ''} step={types ? 0 : ''} className={!types ? `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                     dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`: 'ml-4'}
                    placeholder={placeHolder} required disabled={disable} />
                {
                    clipboard && <svg onClick={() => handleClipboard(value)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-3 cursor-pointer text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                    </svg>

                }
            </div>
            <span className='text-red-600 text-sm font-thin' >{errorMessage}</span>
        </div>
    )
}

export default Input