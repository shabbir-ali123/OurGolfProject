
import { MagnifyingGlassIcon  } from '@heroicons/react/24/outline'


// function classNames(...classes: string[]) {
//     return classes.filter(Boolean).join(' ')
// }

export default function TeacherListHeader() {
   

    return (
        <>
       
                <div>
                    <div className='py-4  md:flex justify-between items-center mx-2'>
                        <h3 className="block text-lg font-bold leading-6 text-gray-900 text-start">Find Your Educator</h3>
                        <div>
                           
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="account-number"
                                    id="account-number"
                                    className=" w-[95%] rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Search"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-[10px] flex items-center ">
                                    <MagnifyingGlassIcon  className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
          
        </>
    )
}