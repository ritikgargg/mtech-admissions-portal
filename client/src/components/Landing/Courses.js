import React from "react"

function Courses() {
  const applications = [
    {
      id: 1,
      department: 'Chemical Engineering',
      specialization: "Chemical Engineering",
      seats: "12",
      eligibility: "Candidates with BTech/BE/MSc with valid score of GATE.",
      gate_paper_codes: "CH"
    },
    {
      id: 2,
      department: 'Civil Engineering',
      specialization: "Water Resources and Environment",
      seats: "15",
      eligibility: "Candidates with BTech/BE in Civil, Environmental, Water resources, Agricultural Engineering and related areas with valid score of GATE.",
      gate_paper_codes: "AG, CE"
    },
    {
      id: 3,
      department: 'Computer Science and Engineering',
      specialization: "Computer Science and Engineering",
      seats: "20",
      eligibility: "Candidates with BTech/BE/MCA or MSc in the appropriate area with the valid GATE score in Computer Science and information Technology (CS), Electronics and communication Engineering (EC), and/or Mathematics (MA).",
      gate_paper_codes: "CS, EC, MA"
    },
    {
      id: 4,
      department: 'Computer Science and Engineering',
      specialization: "Artificial Intelligence",
      seats: "15",
      eligibility: "Candidates with BTech/BE/MCA in the appropriate area with the valid GATE score in Computer Science and Information Technology (CS).",
      gate_paper_codes: "CS"
    },
    {
      id: 5,
      department: 'Electrical Engineering',
      specialization: "Communication and Signal Processing",
      seats: "15",
      eligibility: "Candidates with BTech/BE or MSc in the appropriate area. \nBTech from IITs with CGPA more than 8.0 (SC/ST 7.5) are eligible to apply without GATE.",
      gate_paper_codes: "EC"
    },
    {
      id: 6,
      department: 'Electrical Engineering',
      specialization: "Microelectronics and VLSI Design",
      seats: "15",
      eligibility: "Candidates with BTech/BE or MSc in Electronics and Communication Engineering or Computer Science Engineering or equivalent with valid GATE.",
      gate_paper_codes: "EC, EE, IN"
    },
    {
      id: 7,
      department: 'Electrical Engineering',
      specialization: "Power Engineering",
      seats: "15",
      eligibility: "Candidates with BTech/BE or MSc in the appropriate area. \nBTech from IITs with CGPA more than 8.0 (SC/ST 7.5) are eligible to apply without GATE.",
      gate_paper_codes: "EE"
    },
    {
      id: 8,
      department: 'Mechanical Engineering',
      specialization: "Manufacturing Engineering (MF)",
      seats: "15",
      eligibility: "Candidates with BTech/BE in Mechanical Engineering or relevant area. \nBTech from IITs with CGPA more than 8.0 (SC/ST 7.5) are eligible to apply without GATE.",
      gate_paper_codes: "ME"
    },
    {
      id: 9,
      department: 'Mechanical Engineering',
      specialization: "Mechanics and Design (MD)",
      seats: "15",
      eligibility: "Candidates with BTech/BE in Mechanical Engineering or relevant area. \nBTech from IITs with CGPA more than 8.0 (SC/ST 7.5) are eligible to apply without GATE.",
      gate_paper_codes: "ME"
    },
    {
      id: 10,
      department: 'Mechanical Engineering',
      specialization: "Thermal & Fluids Engineering (TF)",
      seats: "15",
      eligibility: "Candidates with BTech/BE in Mechanical Engineering or relevant area. \nBTech from IITs with CGPA more than 8.0 (SC/ST 7.5) are eligible to apply without GATE.",
      gate_paper_codes: "ME"
    },
    {
      id: 11,
      department: 'Biomedical Engineering',
      specialization: "Biomedical Engineering",
      seats: "15",
      eligibility: "A bachelor's degree in engineering (BE / BTech), with a minimum of 60 percent marks (6.5 grade points on a scale of 10) and a valid GATE score. Relaxation for SC/ST candidates as per GOI rules, \nOR \nA master's degree in science (MSc / MS), or equivalent, with a minimum of 60 percent marks (6.5 grade points on a scale of 10) and a valid GATE score. Relaxation for SC/ST candidates as per GOI rules, \nOR \nA bachelor's degree in medicine/surgery (MBBS), pharmaceutical sciences (BPharm), veterinary science (BVSc), or dental surgery (BDS), with a minimum of 60 percent marks (6.5 grade points on a scale of 10) and a valid GATE score. Relaxation for SC/ST candidates as per GOI rules. \nBTech from IITs with CGPA more than 8.0 (SC/ST 7.5) are eligible to apply without GATE.",
      gate_paper_codes: "AG, BM, BT, CH, CS, CY, EC, EE, IN, MA, ME, PH, XE, XL"
    }
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

      {applications.length !== 0 && 
        <>
          {applications.map((application) => (
            <div className="bg-white mx-12 px-10 pb-4" key={application.id}>
              <div tabIndex="0" className="collapse collapse-arrow border hover:bg-gray-100 border-base-300 bg-transparent rounded-lg">
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
                    <h1 className="font-bold">GATE Paper Codes</h1>
                    <p className="sm:mt-0 sm:col-span-2">{application.gate_paper_codes}</p>
                  </div>

                  <div className="px-4 pt-1 sm:grid sm:grid-cols-6 sm:px-6">
                    <h1 className="font-bold">Eligibility</h1>
                    <p className="sm:mt-0 sm:col-span-5" style={{whiteSpace:"pre-wrap"}}>{application.eligibility}</p>
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