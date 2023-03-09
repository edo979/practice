import {
  getClassNumberFromLS,
  getStudentsFromLS,
  getSubjects,
} from '../data/util'

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
