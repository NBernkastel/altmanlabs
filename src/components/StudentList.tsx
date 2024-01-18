import {Student, StudentId} from "../data/Student"
import SingleStudentComponent from "./student";
import StudentGradeComponent from "./studentGrade";

interface StudentListProps {
    list: Student[]
    marked: Boolean[]
    grades: number[]
    clickId: (studentId: StudentId) => void
    gradeId: (studentId: StudentId, grade: number) => void
}

function StudentListComponent(props: StudentListProps) {
    return (
        <div>
            <table>
                <tbody>
                {props.list.map((studentData, index) => (
                    <tr key ={index}>
                        {props.marked[index] && (
                            <td style={{fontWeight: 'Bold'}} onClick={e => props.clickId(studentData.id)}>
                                <SingleStudentComponent student={studentData}/>
                            </td>
                        )}
                        {!props.marked[index] && (
                            <td onClick={e => props.clickId(studentData.id)}>
                                <SingleStudentComponent student={studentData}/>
                            </td>
                        )}
                        <td>
                            <StudentGradeComponent grade={props.grades[index]} setGrade={(newGrade) => {
                                props.gradeId(studentData.id, newGrade)
                            }} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default StudentListComponent