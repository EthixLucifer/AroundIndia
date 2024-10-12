import React from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div className="flex flex-row p-2 m-1 items-center border-b-2 border-orange-300 max-h-20">

            <div className="basis-2/12 text-xl">
                <Link to='/'>
                    Social Governance DAO
                </Link>
            </div>

            <div className=" flex   space-x-9 justify-center basis-3/4">
                <div>
                    <Link to='/user'>
                        <button className=" px-4 py-2 rounded ">
                            User
                        </button>
                    </Link>
                </div>

                <div>
                    <Link to='/politician'>
                        <button className="px-4 py-2 rounded">Politician</button>
                    </Link>
                </div>

                <div>
                    <Link to='/Admin'>
                        <button className="px-4 py-2"> Administration</button>
                    </Link>
                </div>

                <div>
                    <Link to='/Admin'>
                        <button className="px-4 py-2"> All Proposals</button>
                    </Link>
                </div>
                <div>
                    <Link to='/Admin'>
                        <button className="px-4 py-2"> About Us</button>
                    </Link>
                </div>
            </div>

            <div className="basis-2/12 justify-between items-center">
                <Login />
            </div>
        </div >


    );
}

export default Navbar;