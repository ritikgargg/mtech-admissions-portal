import React from "react"

function Courses(){

  const applications = [
    {
      id: 1,
      department: 'Computer Science and Engineering',
      specialization: "AI",
      seats: "20",
      eligibility: "Candidates with B.Tech /B.E/MCA or M.Sc in the appropriate area with the valid GATE score in Computer Science and information Technology(CS),Electronics and communication Engineering (EC),and /or Mathematics (MA) ",
      gate_paper_codes: "CS, AI",
      deadline: "30-02-2022"
    },
    {
      id: 2,
      department: 'Electrical Engineering',
      specialization: "VSLI",
      seats: "20",
      eligibility: "A bachelor's degree in engineering (BE / BTech), with a minimum of 60 percent marks (6.5 grade points on a scale of 10) and a valid GATE score. Relaxation for SC/ST candidates as per GOI rules, \nOr\n A master's degree in science (MSc / MS), or equivalent, with a minimum of 60 percent marks (6.5 grade points on a scale of 10) and a valid GATE score. Relaxation for SC/ST candidates as per GOI rules, \nOr\n A bachelor’s degree in medicine/surgery (MBBS), pharmaceutical sciences (BPharm), veterinary science (BVSc), or dental surgery (BDS), with a minimum of 60 percent marks (6.5 grade points on a scale of 10) and a valid GATE score. Relaxation for SC/ST candidates as per GOI rules B.Tech. from IITs with CGPA more than 8.0 (SC/ST 7.5) are eligible to apply without GATE .",
      gate_paper_codes: "EE, EC",
      deadline: "30-02-2022"
    }, 
  ]

  return (
    <>
      {applications.length === 0 && 
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">No positions open currently!</div>
            </td>
        </tr>
      }
      {applications.length !== 0 && <>
        {applications.map((application) => (
        <div className="bg-white mx-12 px-10 pb-4">
          <div tabindex="0" className="collapse collapse-arrow border hover:bg-gray-100 border-base-300 bg-transparent rounded-lg">
            <div className="items-center collapse-title text-lg font-medium">
              <div className="font-bold">{application.specialization}</div>
              <div className="text-sm opacity-50">{application.department}</div>
            </div>
            <div className="collapse-content">
              <div className="px-4 pb-1 sm:grid sm:grid-cols-6 sm:px-6">
                <h1 className="font-bold">Seats</h1>
                <p className="sm:mt-0 sm:col-span-2">{application.seats}</p>
              </div>

              <div className="px-4 py-1 sm:grid sm:grid-cols-6 sm:px-6">
                <h1 className="font-bold">Gate Paper Codes</h1>
                <p className="sm:mt-0 sm:col-span-2">{application.gate_paper_codes}</p>
              </div>

              <div className="px-4 pt-1 sm:grid sm:grid-cols-6 sm:px-6">
                <h1 className="font-bold">Eligibility</h1>
                <p className="sm:mt-0 sm:col-span-5">{application.eligibility}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      </>
}
    </>

  );

}

export default Courses;