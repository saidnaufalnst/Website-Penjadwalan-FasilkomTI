import React from "react";
import { Outlet } from "react-router-dom";

const UserContent = () => {
    return(
        <div className="h-screen w-full bg-[#F2F2EA]">
            <div className="h-full">
                <Outlet/>
            </div>
        </div>

    )
}

export default UserContent;