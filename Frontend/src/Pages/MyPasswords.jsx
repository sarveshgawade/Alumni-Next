import React, { useEffect, useState } from 'react'
import BaseLayout from '../Layouts/BaseLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPasswords } from '../Redux/Slices/passwordSlice'
import PasswordCard from '../Components/PasswordCard'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../Helpers/axiosInstance'
import toast from 'react-hot-toast'

function MyPasswords() {
    const dispatch = useDispatch()
    const [myPasswords, setMyPasswords] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredResults, setFilteredResults] = useState([])
    const navigate = useNavigate()
    const {isLoggedIn} = useSelector(state => state?.auth)

    async function loadMyPasswords() {
        const response = await dispatch(getAllPasswords())
        setMyPasswords([...response?.payload])
    }

    useEffect(() => {
        loadMyPasswords()
    }, [])

    useEffect(() => {
        
        const results = myPasswords.filter(item => 
            item.websiteName.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.registeredEmail.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.userName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredResults(results)
    }, [searchQuery])

    async function onDelete(passwordId) {
        const confirmation = window.confirm('Are you sure you want to delete this Password?')

        if (confirmation) {
            const response = await axiosInstance.delete(`/my-passwords/${passwordId}`)

            if (response?.data?.success) {
                toast.success(response?.data?.message)
            }

            loadMyPasswords()
        }
    }

    async function onEdit(passwordId,passwordDetails) {
        navigate('/my-passwords/edit',{state: passwordDetails})        
    }

    return (
        <BaseLayout>
            <div className="gap-4 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-purple-500 to-indigo-500 p-4 shadow-lg mb-4">
                <div className="flex flex-1 items-center w-full md:w-auto mb-4 md:mb-0">
                    <input
                        type="text"
                        className="w-full p-2 rounded-l-lg focus:outline-none"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        onClick={() => handleSearch()}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-lg transition-colors duration-300"
                    >
                        Search
                    </button>
                </div>
                <button
                    onClick={() => navigate('/my-passwords/add')}
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-300"
                >
                    Add New Password
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {
                    !isLoggedIn && (
                        <h1 className="pt-14 col-span-full text-center text-2xl font-bold text-gray-400 opacity-75">
                                Please login to display saved passwords !
                        </h1>
                    )
                }
                {
                    searchQuery ? (
                        filteredResults.length === 0 ? (
                            <h1 className="pt-14 col-span-full text-center text-2xl font-bold text-gray-400 opacity-75">
                                No matching passwords found!
                            </h1>
                        ) : (
                            filteredResults.map(item => (
                                <PasswordCard
                                    key={item._id}
                                    password={item.password}
                                    registeredEmail={item.registeredEmail}
                                    username={item.userName}
                                    websiteName={item.websiteName}
                                    onDelete={() => onDelete(item._id)}
                                />
                            ))
                        )
                    ) : (
                        isLoggedIn && myPasswords.length === 0 ? (
                            <h1 className="pt-14 col-span-full text-center text-2xl font-bold text-gray-400 opacity-75">
                                No passwords saved yet!
                            </h1>
                        ) : (
                            myPasswords.map(item => (
                                <PasswordCard
                                    key={item._id}
                                    password={item.password}
                                    registeredEmail={item.registeredEmail}
                                    username={item.userName}
                                    websiteName={item.websiteName}
                                    onDelete={() => onDelete(item._id)}
                                    onEdit={()=> onEdit(item._id,item)}
                                />
                            ))
                        )
                    )
                }
            </div>
        </BaseLayout>
    )
}

export default MyPasswords
