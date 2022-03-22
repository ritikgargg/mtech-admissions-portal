import React from 'react'

function DeleteAlert(props){
    return (
      <div className="pl-5 bg-white rounded-lg">
        <h2 className="text-lg font-bold">Are you sure you want to do that?</h2>
        <p className="mt-2 text-sm text-gray-500">
            Doing that will delete all the data associated with the admission cycle, are you 100% sure it's OK?
        </p>
        <div className="flex items-center justify-end mt-8 text-xs">
            <button type="button" className="px-4 py-2 font-medium text-green-600 rounded bg-green-50">Yes, I'm sure</button>
            <button type="button" onClick={props.handleClose} className="px-4 py-2 ml-2 font-medium text-gray-600 rounded bg-gray-50">No, go back</button>
        </div>
      </div>
    )

}

export default DeleteAlert