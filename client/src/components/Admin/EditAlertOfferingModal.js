import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Tooltip, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Grid } from '@mui/material';
import Delete from '../../images/delete.png'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5
};

export default function DeleteAlertModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function changeDateFormat(deadline){
    let date = new Date(deadline);

    let month = date.getMonth()+1;
    if(month.length === 1) month = '0' + month;
    
    date = date.getFullYear() + '-0' + month + '-' + date.getDate();
    return date;
  }

  return (
    <div>
      <Tooltip title="Edit">
         <button type="button" onClick={handleOpen} className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
        </button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="relative w-full max-w-2xl h-full md:h-auto" id="modal-modal-description">
              <div className="bg-white rounded-lg shadow relative">
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className="text-xl font-bold">
                    Edit product
                  </h3>
                  <button onClick={handleClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <form action="#">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="product-name" className="text-sm font-medium text-gray-900 block mb-2">Department</label>
                        <input value={props.application.department} type="text" name="product-name" id="product-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Computer Science and Engineering" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="category" className="text-sm font-medium text-gray-900 block mb-2">Specialization</label>
                        <input value={props.application.specialization} type="text" name="category" id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Artificial Intelligence" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="brand" className="text-sm font-medium text-gray-900 block mb-2">Seats</label>
                        <input value={props.application.seats} type="text" name="brand" id="brand" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="20" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Gate Paper Codes</label>
                        <input value={props.application.gate_paper_codes} type="text" name="price" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="CS" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="brand" className="text-sm font-medium text-gray-900 block mb-2">Deadline</label>
                        <input
                            type="date"
                            value={changeDateFormat(props.application.deadline)}
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
                        <textarea value={props.application.eligibility} id="product-details" rows={6} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Candidates with BTech/BE/MCA in the appropriate area with the valid GATE score in Computer Science and Information Technology(CS)." defaultValue={""} />
                      </div>
                    </div>
                  </form></div>
                <div className="p-6 border-t border-gray-200 rounded-b">
                  <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Save all</button>
                </div>
              </div>
            </div>
        </Box>
      </Modal>
    </div>
  );
}