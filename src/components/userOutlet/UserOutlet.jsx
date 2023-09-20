import { Outlet } from "react-router"
import logo from '../../assets/logo-web.jpg'
import { useState } from "react"
import { useNavigate } from "react-router-dom";
function UserOutlet() {
    const [user, setUser] = useState(true)
    const [dropDown, setDropDown] = useState(false)
    const navigate = useNavigate()
    const navigateTo = (url) => {
        navigate(url)
    }
    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-r from-orange-500/60 via-violet-600/60 to-violet-950/60 " >
            <div className="container xl-auto z-50 ">
                <div className="px-10 py-2">
                    <ul className="max-w-full flex flex-wrap items-center justify-between">
                        <li className="flex-item-center">
                            <img onClick={() => navigate('/')} src={logo} width={100} height={10} alt="logo password generator" />
                        </li>
                        <li className="flex-item-center">
                            <span className="m-1 cursor-pointer">
                                {
                                    user && <>
                                        <div style={{ position: 'relative' }}>
                                            <div onClickCapture={() => setDropDown((prev) => !prev)} className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">{'vyshnav p c'.slice(0, 1)}</span>
                                            </div>

                                            <div id="dropdown" className={` z-10 ${!dropDown ? "hidden" : "block"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`} style={{ position: 'absolute', right: '40px' }}>
                                                <ul className="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                    <li>
                                                        <button onClick={() => setUser(prev => !prev)} type="button" className="m-2 w-[90%] text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                }
                            </span>
                            {
                                !user &&
                                <button onClick={() => navigateTo('login')} type="button" className="m-2 w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Login</button>
                            }
                        </li>
                    </ul>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default UserOutlet