import {
  getClassNumberFromLS,
  getStudentsFromLS,
  getSubjects,
} from '../data/util'
import {
  getStudentAverage,
  subjectAverage,
  subjectFailStudentsCount,
  subjectPassStudentsCount,
  subjetGradeCount,
} from '../util/grades'

export default function Results() {
  //TODO add function to get subjects directly
  const subjects = getSubjects(getClassNumberFromLS())
  const students = getStudentsFromLS()

  return (
    <div className="max-w-lg px-2">
      <p>Ocjene učenika:</p>
      <table className="table-fixed border-collapse border border-slate-500 text-sm">
        <thead>
          <tr>
            <th className="border border-slate-400">Br.D.</th>
            <th className="border border-slate-400">Ime</th>
            <th className="border border-slate-400">prezime</th>

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

      <p>Ocjene predmeta</p>
      <table className="table-fixed border-collapse border border-slate-500 text-sm">
        <thead>
          <tr>
            <th className="border border-slate-400 px-1">Predmet</th>
            <th className="border border-slate-400 px-1">5</th>
            <th className="border border-slate-400 px-1">4</th>
            <th className="border border-slate-400 px-1">3</th>
            <th className="border border-slate-400 px-1">2</th>
            <th className="border border-slate-400 px-1">1</th>
            <th className="border border-slate-400 px-1">Prolazi</th>
            <th className="border border-slate-400 px-1">Popravni</th>
            <th className="border border-slate-400 px-1">Prosjek</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, i) => (
            <tr key={subject} className="odd:bg-slate-200">
              <td className="border border-slate-400">{subject}</td>
              <td className="border border-slate-400 text-center">
                {subjetGradeCount(students, i, 5)}
              </td>
              <td className="border border-slate-400 text-center">
                {subjetGradeCount(students, i, 4)}
              </td>
              <td className="border border-slate-400 text-center">
                {subjetGradeCount(students, i, 3)}
              </td>
              <td className="border border-slate-400 text-center">
                {subjetGradeCount(students, i, 2)}
              </td>
              <td className="border border-slate-400 text-center">
                {subjetGradeCount(students, i, 1)}
              </td>
              <td className="border border-slate-400 text-center">
                {subjectPassStudentsCount(students, i)}
              </td>
              <td className="border border-slate-400 text-center">
                {subjectFailStudentsCount(students, i)}
              </td>
              <td className="border border-slate-400 text-center">
                {subjectAverage(students, i)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
