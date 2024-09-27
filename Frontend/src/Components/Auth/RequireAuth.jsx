import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate, Outlet} from 'react-router-dom'
import AccessDenied from '../../Pages/AccessDenied'

function RequireAuth({allowedRoles}) {

    const {isLoggedIn, role} = useSelector(state => state?.auth)

  return isLoggedIn && allowedRoles.find(myRole => myRole == role) ? <Outlet /> : isLoggedIn ? <AccessDenied/> : <Navigate to='/user/signin' />
}

export default RequireAuth
