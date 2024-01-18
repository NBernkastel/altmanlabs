import React, {useRef} from 'react';
import {StudentId} from '../data/Student'
import { CourseId } from '../data/Course';

interface AddMarktoStudentProps {
    add: (courseId: CourseId, studentId: StudentId, grade: number) => void
}

function AddMarktoStudent(props: AddMarktoStudentProps) {
    let CurseRef = useRef<HTMLInputElement | null>(null);
    let StudentRef = useRef<HTMLInputElement | null>(null);
    let GradeRef = useRef<HTMLInputElement | null>(null);

    function changeGrade(): void {
        if (CurseRef.current && StudentRef.current && GradeRef.current) {
            props.add(CurseRef.current.value, StudentRef.current.value, GradeRef.current.value as unknown as number)
        }
    }

    return (
        <div>
            <label>Curse</label>
            <input ref={CurseRef}/>
            <label>Student</label>
            <input ref={StudentRef}/>
            <label>Grade</label>
            <input ref={GradeRef}/>
            <button onClick={changeGrade}>
                Change
            </button>
        </div>
    )
}

export default AddMarktoStudent
