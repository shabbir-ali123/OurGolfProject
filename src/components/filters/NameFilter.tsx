
import { MagnifyingGlassIcon  } from '@heroicons/react/24/outline'


export default function NameFilter({handleNameChange}: any) {

    return (
        <>
                <div>
                    <div className='py-4'>
                        <h3 className="block text-lg font-bold leading-6 text-gray-900 text-start">Name:</h3>
                        <div>
                           
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="account-number"
                                    id="account-number"
                                    className=" w-[95%] rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Search"
                                    onChange={handleNameChange}
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
