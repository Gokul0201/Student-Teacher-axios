import './App.css';
import React,{ useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import CreateStudent from './components/CreateStudent';
import EditStudent from './components/EditStudent';
import CreateTeacher from './components/CreateTeacher';
import EditTeacher from './components/EditTeacher';
import Studentlist from './components/Studentlist';
import Teacherlist from './components/Teacherlist';
export const url = 'https://62a96c57ec36bf40bdb75056.mockapi.io/users/student';
export const url1 = 'https://62a96c57ec36bf40bdb75056.mockapi.io/users/teacher'

export const StudentContext = React.createContext();

function App() {
  // console.log(students)
  let data = {
    monthly:"Rs. 40,000",
    annual:"Rs. 4,80,000",
    task:70,
    pending:18
  }


  let [students,setStudents] = useState([""])

  return <>
  <div className='main-wrapper'>

      <BrowserRouter>
      <Sidebar/>
      <StudentContext.Provider value ={{data,students,setStudents}}>
          <Routes>
              <Route path='dashboard' element={<Dashboard/>}/>
              <Route path='create-student' element={<CreateStudent/>}/>
              <Route path='create-teacher' element={<CreateTeacher/>}/>
              <Route path='edit-student/:id' element={<EditStudent/>}/>
              <Route path='edit-teacher/:id' element={<EditTeacher/>}/>
              <Route path='student-list' element={<Studentlist/>}/>
              <Route path='teacher-list' element={<Teacherlist/>}/>
              <Route path='*' element={<Navigate to='/dashboard'/>}/>
          </Routes>
        </StudentContext.Provider>
      </BrowserRouter>
  </div>
  </>
}
export default App;
