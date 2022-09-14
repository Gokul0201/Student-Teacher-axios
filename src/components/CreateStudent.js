import React,{useState, useEffect}  from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Dropdown} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import {url} from '../App'
import {url1} from '../App'
import axios from 'axios'

function CreateStudent() {

  let [name,setName] = useState("");
  let [email,setEmail] = useState("");
  let [mobile,setMobile] = useState("");
  let [batch,setBatch] = useState("");
  let [teacher,setTeacher] = useState("");
  let [teachers,setTeachers] = useState([]);
  let navigate = useNavigate();
  
  useEffect(() => {
    getData();
  }, []);
  let getData = async () => {
    let teacher_data = await axios.get(url1);
    setTeachers(teacher_data.data);
  };

  let handleSubmit = async ()=>{
    let id = teachers.filter(ele=>ele.name === teacher)
    let idData = {
      students:[name]
    }
      let data = {
        name,
        email,
        mobile,
        batch,
        teacher,
      }
      console.log(id)
      console.log(idData);
      await axios.post(url,data);
      await axios.put(`${url1}/${id[0].id}`,idData)

      //Just to jump to different route
   
        navigate('/student-list')
  }

  return <>
    <div className="container">
    <Form>
        <Form.Group className="mb-3" >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mobile</Form.Label>
        <Form.Control type="text" placeholder="Mobile" onChange={(e)=>{
          setMobile(e.target.value)
        }}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Batch </Form.Label>
        <Form.Control type="text" placeholder="Batch" onChange={(e)=>setBatch(e.target.value)}/>
      </Form.Group>

      
    <Form.Group className="mb-3" >
  <Form.Label>Teacher</Form.Label> 
  <Form.Select aria-label="Default select example" onChange={(e=>setTeacher(e.target.value))}>
  <option >Select Teacher</option>
    {  teachers.map((option)=>(
      <option key={option.name}value={option.name}>{option.name}</option>
    ))} 
    </Form.Select>
    </Form.Group>

      <Button variant="primary" onClick={()=>handleSubmit()}>
        Submit
      </Button>
</Form>
    </div>
  </>
}

export default CreateStudent