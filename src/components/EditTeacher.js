import React,{useState, useEffect}  from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useNavigate,useParams} from 'react-router-dom';
import {url1} from '../App'
import axios from 'axios';

function EditTeacher() {
  let params = useParams();

  let [name,setName] = useState("");
  let [email,setEmail] = useState("");
  let [mobile,setMobile] = useState("");
  let [batch,setBatch] = useState("");

  useEffect(()=>{
    getData()
  },[])

  let getData = async ()=>{
    let res = await axios.get(`${url1}/${params.id}`)
    setName(res.data.name)
    setEmail(res.data.email)
    setMobile(res.data.mobile)
    setBatch(res.data.batch)
  }

  let navigate = useNavigate();

  let handleSubmit = async ()=>{
      let data = {
        name,
        email,
        mobile
      }
      let res = await axios.put(`${url1}/${params.id}`,data)
      //Just to jump to different route
      if(res.status===200)
        navigate('/teacher-list')
  }

  return <>
    <div>
    <Form>
        <Form.Group className="mb-3" >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mobile</Form.Label>
        <Form.Control type="text" value={mobile} placeholder="Mobile" onChange={(e)=>{
          setMobile(e.target.value)
        }}/>
      </Form.Group>

   
      
      <Button variant="primary" onClick={()=>handleSubmit()}>
        Submit
      </Button>
</Form>
    </div>
  </>
}

export default EditTeacher