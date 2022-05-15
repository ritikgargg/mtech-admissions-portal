import React from "react";

function FAQs() {
  return (
    <>
      <div className="min-h-screen">
        <div className="bg-white mx-12 p-6">
          <div
            tabIndex={0}
            className="mb-4 collapse border border-base-300 bg-base-100 hover:bg-gray-100 rounded-lg collapse-plus"
          >
            <div className="collapse-title text-lg font-medium">
              How MS(R) program is different than an MTech program?
            </div>
            <div className="collapse-content">
              <p>
                The basic idea of two programs are different. MTech program is
                oriented towards masters in engineering while MS(R) program is
                oriented towards research. Due to the basic approach of two
                programs, we see a couple of differences: <br />
                <br />
                (a) MTech program has more course work then MS(R). A typical
                course work of MTech will spread over minimum two semesters.
                <br />
                (b) In MS(R) student spend most of the time in doing research.
                Due to nature of research, a student may take more than two
                years to graduate from MS(R) program.
                <br />
                (c) MS(R) is evaluated based on his/her research output
                (typically in form of publications). While for MTech, final
                project could be implementation or research, therefore,
                publications is not mandatory.
              </p>
            </div>
          </div>

          <div
            tabIndex={0}
            className="mb-4 collapse border border-base-300 bg-base-100 hover:bg-gray-100 rounded-lg collapse-plus"
          >
            <div className="collapse-title text-lg font-medium">
              What are the career options after MS(R) or what are the job
              opportunities after MS(R)
            </div>
            <div className="collapse-content">
              <p>
                Since MS(R) is research oriented, there are following
                possibilities:
                <br />
                (a) Further studies, PhD: By the end of MS(R) you would already
                have some publications. So it is easier to get admission in PhD.
                <br />
                (b) Industry <br />
                (i) Research oriented profile: Based on type of research that
                candidate have done during MS(R), s/he can apply to various
                companies that have research labs in India, such as Microsoft
                research, IBM research, HP research, Xerox research, Intel labs,
                Google labs, etc. <br />
                (ii) Research and Development profile: In computer science many
                companies prefer a research oriented profile for research and
                development jobs. As it the candidate bring better understanding
                of the concern subject matter. This kind of profile generally
                require some development experience during IIT Ropar. <br />
              </p>
            </div>
          </div>

          <div
            tabIndex={0}
            className="mb-4 collapse border border-base-300 bg-base-100 hover:bg-gray-100 rounded-lg collapse-plus"
          >
            <div className="collapse-title text-lg font-medium">
              As MS(R) is new in IIT Ropar, will it have good placements?
            </div>
            <div className="collapse-content">
              <p>
                MS(R) students are eligible to sit in companies that visit for
                campus placements. In computer science, in general good number
                of companies visit campus. In addition to that, student may
                approach companies that work in his area of research. Based on
                student's expertise, companies may conduct off-campus interview
                for them.
              </p>
            </div>
          </div>

          <div
            tabIndex={0}
            className="mb-4 collapse border border-base-300 bg-base-100 rounded-lg hover:bg-gray-100 collapse-plus"
          >
            <div className="collapse-title text-lg font-medium">
              Is it actually better to do MS(R) or MTech
            </div>
            <div className="collapse-content">
              <p>
                As a rule of thumb, to build research profile, one should do
                MS(R) and to increase the industry job prospects one should do
                MTech. However, this rule of thumb is not very hard rule.
                Students after finishing MS(R) may go for industry jobs, and PhD
                can be done after finishing MTech.
              </p>
            </div>
          </div>

          <div
            tabIndex={0}
            className="mb-4 collapse border border-base-300 bg-base-100 rounded-lg hover:bg-gray-100 collapse-plus"
          >
            <div className="collapse-title text-lg font-medium">
              What are the research areas in the field of MS?
            </div>
            <div className="collapse-content">
              <p>
                For research areas, one should look at the individual faculty
                profile of computer science department.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQs;
