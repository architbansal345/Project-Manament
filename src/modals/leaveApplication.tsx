import { useEffect, useRef } from "react"
import { FaRegThumbsUp } from "react-icons/fa"

interface LeaveSubmittedType {
    label:string,
    Sublabel:string
    onClick:(val:string) => void;
}
export const LeaveSubmitted = ({label,Sublabel , onClick}:LeaveSubmittedType) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const handleClickOutside = (event:MouseEvent) => {
        if(modalRef.current && !modalRef.current.contains(event.target as Node)){
            if(navigator.vibrate) {
                navigator.vibrate([100,50,100])
            }
        }
    }
    useEffect(()=>{
        document.addEventListener("click",handleClickOutside);
        return () => {
            document.removeEventListener("click",handleClickOutside)
        }
    },[])
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <div className="w-full self-center flex justify-center">
            <FaRegThumbsUp className="w-20 h-20"/>
            </div>
            <h2 className="text-lg font-semibold mb-4 mt-4">{label}</h2>
            <p>{Sublabel}</p>
            <button
              className="mt-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 self-center"
              onClick={() => onClick("yes")}
            >
              Close
            </button>
          </div>
        </div>

    )
}