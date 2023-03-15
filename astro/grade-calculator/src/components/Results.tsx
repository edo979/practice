import {
  getClassNumberFromLS,
  getStudentsFromLS,
  getSubjects,
} from '../data/util'
import {
  getClassResults,
  getStudentAverage,
  getSubjectsResult,
} from '../util/grades'
import '../style/print.css'

export default function Results() {
  //TODO add function to get subjects directly
  const subjects = getSubjects(getClassNumberFromLS())
  const students = getStudentsFromLS()

  return (
    <div className="px-2 print-page">
      <h1 className="mt-4 text-2xl font-bold md:text-5xl md:mt-8">
        Rezultati razreda
      </h1>

      <section className="print print__landscape overflow-x-scroll">
        <h2 className="mt-8 text-xl font-bold md:text-3xl">Ocjene učenika:</h2>
        <table className="mt-2 table-fixed border-collapse border border-slate-400 text-sm">
          <thead>
            <tr>
              <th className="border border-slate-400">Br.</th>
              <th className="border border-slate-400">Ime</th>
              <th className="border border-slate-400">Prezime</th>

              {subjects.map((subject) => (
                <th key={subject} className="border border-slate-400 px-1">
                  {subject.slice(0, 2)}
                </th>
              ))}

              <th className="border border-slate-400 px-1">Prosjek</th>
              <th className="border border-slate-400 px-1">Uspjeh</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="odd:bg-slate-200">
                <td className="border border-slate-400">{student.id}.</td>
                <td className="border border-slate-400 px-1">
                  {student.firstName}
                </td>
                <td className="border border-slate-400 px-1">
                  {student.lastName}
                </td>

                {student.grades.map((grade, i) => (
                  <td key={i} className="border border-slate-400 text-center">
                    {grade}
                  </td>
                ))}

                <td className="border border-slate-400 text-center">
                  {getStudentAverage(student.grades)}
                </td>
                <td className="border border-slate-400 text-center font-bold">
                  {Math.round(getStudentAverage(student.grades))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-4 print">
        <h2 className="text-xl font-bold md:text-3xl">Ocjene razreda:</h2>

        <div className="overflow-x-scroll">
          <table className="w-max mt-2 table-auto border-collapse border border-slate-400 text-sm">
            <thead>
              <tr>
                <th className="border border-slate-400 px-1">5</th>
                <th className="border border-slate-400 px-1">4</th>
                <th className="border border-slate-400 px-1">3</th>
                <th className="border border-slate-400 px-1">2</th>
                <th className="border border-slate-400 px-1">Ukupno</th>
                <th className="border border-slate-400 px-1">1.slaba</th>
                <th className="border border-slate-400 px-1">2.slabe</th>
                <th className="border border-slate-400 px-1">3.slabe</th>
                <th className="border border-slate-400 px-1">Ukupno</th>
                <th className="border border-slate-400 px-1">Pr.Razreda</th>
                <th className="border border-slate-400 px-1">Pr.Ocjena</th>
              </tr>
            </thead>
            <tbody>
              {getClassResults(students).map((row, i) => (
                <tr key={i} className="odd:bg-slate-200">
                  {row.map((result, i) => (
                    <td
                      key={i}
                      className="px-1 border border-slate-400 text-center"
                    >
                      {result}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 overflow-x-scroll">
          <h2 className="text-xl font-bold md:text-3xl">Ocjene predmeta:</h2>
          <table className="w-max mt-2 table-auto border-collapse border border-slate-400 text-sm">
            <thead>
              <tr>
                <th className="border border-slate-400 px-1">Predmet</th>
                <th className="border border-slate-400 px-1">5</th>
                <th className="border border-slate-400 px-1">4</th>
                <th className="border border-slate-400 px-1">3</th>
                <th className="border border-slate-400 px-1">2</th>
                <th className="border border-slate-400 px-1">1</th>
                <th className="border border-slate-400 px-1">Prolazi</th>
                <th className="border border-slate-400 px-1">Prosjek</th>
              </tr>
            </thead>
            <tbody>
              {getSubjectsResult(students, subjects).map(
                (subjectResults, i) => (
                  <tr key={i} className="odd:bg-slate-200">
                    {subjectResults.map((result, i) => (
                      <td
                        key={i}
                        className="px-1 border border-slate-400 text-center"
                      >
                        {result}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section></section>

      <div className="text-right">
        <button className="mt-4 ml-auto btn" onClick={() => window.print()}>
          Štampaj
        </button>
      </div>
    </div>
  )
}
