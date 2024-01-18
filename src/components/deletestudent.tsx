import React, {useRef} from 'react';
import {StudentId} from '../data/Student'

interface DeleteStudentProps {
    add: (studentId: StudentId) => void
}

function DeleteStudent(props: DeleteStudentProps) {
    let StudentRef = useRef<HTMLInputElement | null>(null);

    function deletest(): void {
        if (StudentRef.current) {
            props.add(StudentRef.current.value)
        }
    }

    return (
        <div>
            <label>Student</label>
            <input ref={StudentRef}/>
            <button onClick={deletest}>
                Delete
            </button>
        </div>
    )
}

export default DeleteStudent
