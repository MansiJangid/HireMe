import { Outlet } from "react-router-dom"
import '../App.css'
import '../index.css'
import Header from "@/components/header"
const AppLayout = () =>{
    return (
        <div>
            <div className="grid-background">
                <main className="min-h-screen container">
                    <Header />
                    <Outlet />
                </main>
                <div className="glow"></div>
                <div className="p-10 text-center bg-gray-800 mt-10">Made with 🫶 by Mansi</div>

            </div>
        </div>
    )
}

export default AppLayout