import React,{useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import {url1} from '../App';
import axios from 'axios';
const Teacherlist = () => {
    let navigate = useNavigate();
    let [data,setData] = useState([]);

    useEffect(()=>{
        getData()
    },[])

    let getData = async ()=>{
       let res = await axios.get(url1)
       setData(res.data)
    }

    let handleDelete = async(i)=>{
        try
        {
            await axios.delete(`${url1}/${i}`)
        }
        catch(error)
        {
            console.log(error)
        }
        getData()
    }
  return (
    <div className='container'>
      <h3 className='text-center text-dark'>Teachers List</h3> 
        <div className='row py-5'>
    <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map((e)=>{
                    return <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.mobile}</td>
                        <td>
                            <Button variant="primary" onClick={()=>navigate(`/edit-teacher/${e.id}`)}>Edit</Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={()=>handleDelete(e.id)}>Delete</Button>
                        </td>
                    </tr>
                })
            }
          </tbody>
        </Table>                                         
    </div></div>
  )
}

export default Teacherlist