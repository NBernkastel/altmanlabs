import React, {createContext, useReducer, useState} from 'react';
import markReducer from "./redux/reducer";
import {ContextProvider} from "./data/ContextProvider";
import {testState} from "./redux/State";
import {HashRouter, Route, Routes, Link as ReactRouterLink} from "react-router-dom";
import GradePickerComponent from "./components/gradePicker";
import CoursePickerComponent from "./components/coursePicker";
import ModePickerComponent from "./components/modePicker";
import ColorInputComponent from "./components/colorInput";
import {ADeleteStudent, AddStudent, ChangeStudentGrade} from "./redux/action";
import CAddStudent from "./components/addStudent";
import AddMarktoStudent from './components/addmarktostudent';
import {CourseId} from './data/Course';
import {StudentId} from './data/Student';
import DeleteStudent from './components/deletestudent';

const css: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flex: 'min-content',
};

export const contextMode = createContext(new ContextProvider(Array.from({length: 10}, () => "#FFFFFF"), "Full"));

function App() {
    const [greatLink, setGreatLink] = useState('Great');
    const [badLink, setBadLink] = useState('Bad');

    const gradesLinks = [greatLink, badLink];
    const [state, dispatch] = useReducer(markReducer, testState());
    const [settingsContext, setContext] = useState(new ContextProvider(Array.from({length: 10}, () => "#FFFFFF"), "Full"));

    return (
        <React.StrictMode>
            <contextMode.Provider value={settingsContext}>
                <HashRouter>
                    <div style={css}>
                        {state.courses.map((course) => (
                            <ReactRouterLink to={`/${course.name}`} style={css}>
                                {course.name}
                            </ReactRouterLink>
                        ))}
                    </div>

                    <div style={{flexDirection: 'column'}}>
                        {gradesLinks.map((gradeLink) => (
                            <ReactRouterLink key={gradeLink} to={`/list/${gradeLink}`} style={css}>
                                {gradeLink}
                            </ReactRouterLink>
                        ))}
                    </div>

                    <details>
                        <summary>Add Student</summary>
                        <CAddStudent add={(student) => dispatch(new AddStudent(student))}/>
                    </details>
                    <details>
                        <summary>Change mark to student</summary>
                        <AddMarktoStudent
                            add={(courseId: CourseId, studentId: StudentId, grade: number) => dispatch(new ChangeStudentGrade(courseId, studentId, grade))}/>
                    </details>
                    <details>
                        <summary>Delete Student</summary>
                        <DeleteStudent add={(studentId: StudentId) => dispatch(new ADeleteStudent(studentId))}/>
                    </details>

                    <div style={{flexDirection: 'column'}}>
                        <ReactRouterLink to="/settings" style={css}>
                            Settings
                        </ReactRouterLink>
                    </div>

                    <Routes>
                        <Route path=":name" element={<CoursePickerComponent state={state} dispatch={dispatch}/>}/>
                        <Route path="list/:listnum"
                               element={<GradePickerComponent state={state} dispatch={dispatch}/>}/>
                        <Route
                            path="settings"
                            element={
                                <div style={css}>
                                    <ModePickerComponent
                                        mode={settingsContext.mode}
                                        setMode={(mode) =>
                                            setContext({...settingsContext, mode})}
                                    />
                                    <ColorInputComponent
                                        value={settingsContext.colors}
                                        setValue={(index, color) =>
                                            setContext({
                                                ...settingsContext,
                                                colors: settingsContext.colors.map((color1, index1) =>
                                                    index === index1 ? color : color1
                                                ),
                                            })
                                        }
                                    />
                                </div>
                            }
                        />
                    </Routes>
                </HashRouter>
            </contextMode.Provider>
        </React.StrictMode>
    );
}

export default App;
