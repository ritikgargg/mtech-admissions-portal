import React from 'react'

export default function AddOfferingModal(){
    return(
        <>
        <button type="button" data-modal-toggle="add-product-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto">
            <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
            Add offering
        </button>
        <div className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full" id="add-product-modal" aria-hidden="true">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div className="bg-white rounded-lg shadow relative">
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className="text-xl font-semibold">
                    Add offering
                  </h3>
                  <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="add-product-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <form action="#">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="product-name" className="text-sm font-medium text-gray-900 block mb-2">Department</label>
                        <input type="text" name="product-name" id="product-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Computer Science and Engineering" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="category" className="text-sm font-medium text-gray-900 block mb-2">Specialization</label>
                        <input type="text" name="category" id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Artificial Intelligence" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="brand" className="text-sm font-medium text-gray-900 block mb-2">Seats</label>
                        <input type="text" name="brand" id="brand" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="20" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Gate Paper Codes</label>
                        <input type="text" name="price" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="CS" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="brand" className="text-sm font-medium text-gray-900 block mb-2">Deadline</label>
                        <input
                            type="date"
                            required
                            id="start-date"
                            name="start-date"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Status</label>
                        
                        <select
                          id="degree"
                          name="degree"
                          required
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        >
                          <option value="">- Select -</option>
                          <option value="Open">Open</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                      <div className="col-span-full">
                        <label htmlFor="product-details" className="text-sm font-medium text-gray-900 block mb-2">Eligibility</label>
                        <textarea id="product-details" rows={6} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Candidates with BTech/BE/MCA in the appropriate area with the valid GATE score in Computer Science and Information Technology(CS)." defaultValue={""} />
                      </div>
                    </div>
                  </form></div>
                <div className="p-6 border-t border-gray-200 rounded-b">
                  <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Add offering</button>
                </div>
              </div>
            </div>
          </div>
          </>
    )
}