import React, {useRef} from 'react';
import {Student, StudentId} from '../data/Student'
import { CourseId } from '../data/Course';

interface DeleteStudent {
    add: (studentId: StudentId) => void
}

function DeleteStudent(props: DeleteStudent) {
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
