/* import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */

import './App.css'
import Home from './pages/Home'
import Signup from './pages/Signup'
import MenuPage from './pages/Menu'

import Manage from './pages/Manage'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar'

import Shopinfo from './components/Shopinfo'
import ManageMenu from './components/ManageMenu'
import Subs from './components/Subs'
import DayMenu from './components/DayMenu'

import ShopPage from './components/ShopPage'
import ManageQr from './components/admin/ManageQr'
import ManageOrders from"./components/ManageOrders"

import { AuthContextProvider } from './hooks/Auth'
import { CategoriesContextProvider } from './hooks/MenuContext'

import {SnackBarContextProvider} from "./hooks/useSnackBar";
import Checkout from './pages/Checkout'

function App() {
	
	return (
	<>	
	  <AuthContextProvider>
	  <SnackBarContextProvider>
		<CategoriesContextProvider>

		<Router>
			<Routes>

				<Route path="/" element={<Home/>} />
				<Route path="/signup" element={<Signup/>} />
				<Route path="menu/:shopid/:table" element={<MenuPage />} />
				<Route path='/confirm/:shopid/:table/checkout/:orderid' element={<Checkout/>} />

				<Route path="manage" element={<Manage/>}>
					<Route path="info" element={<Shopinfo/>} />
					<Route path='shop' element={<ShopPage/>}/>
					<Route path='orders' element={<ManageOrders/>}/>
					<Route path="menu" element={<ManageMenu/>} >

					</Route>

					<Route path="subs" element={<Subs/>} />
					<Route path="daymenu" element={<DayMenu/>} />
					<Route path="qrcodes" element={<ManageQr/>} />
				</Route>


				{/* 				
					<Route element={<PrivateRoutes/>}>
					</Route>
					<Route path="/connect" Component={Connect}></Route>
					<Route path="/admin" Component={Home}></Route>
					<Route path="/shop/:id" Component={Shop}></Route> 
				*/}

			</Routes>
		</Router>
		</CategoriesContextProvider>
		</SnackBarContextProvider>
	</AuthContextProvider>

	</>
	)
}

export default App
