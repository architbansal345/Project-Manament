import { BiNotification } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

export default function Header() {
    return (
        <header className="w-full h-20 bg-white flex items-center justify-between p-4 font-semibold">
            <h1 className="text-lg">KSB EnterPrise</h1>
            <div className="flex gap-2">
                <div className="flex rounded-full bg-blue-500 p-2">
                    <BiNotification className="w-6 h-6"/>
                </div>
                <div className="flex rounded-full bg-yellow-500 p-2">
                    <CgProfile className="w-6 h-6"/>
                </div>
            </div>
        </header>
    )
}