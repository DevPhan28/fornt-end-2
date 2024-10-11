
import { Link, Outlet } from 'react-router-dom'
import BlokUser from './BlokUser'

const Layout = () => {
    if(BlokUser()){
        return (
            <>
           <p>Xin chào đây là trang Admin</p> <Outlet/>
            
            </>
          )
    } else {
        return (
            <>
                bạn không có quyền truy cập trang này <Link to="/">Trở lại trang chủ</Link>
            </>
        )
    }
 
}

export default Layout