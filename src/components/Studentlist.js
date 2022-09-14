import React,{useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import {url} from '../App';
import axios from 'axios';
const Studentlist = () => {
    let navigate = useNavigate();
    let [data,setData] = useState([]);

    useEffect(()=>{
        getData()
    },[])

    let getData = async ()=>{
       let res = await axios.get(url)
       setData(res.data)

    }

    let handleDelete = async(i)=>{
        try
        {
            await axios.delete(`${url}/${i}`)
        }
        catch(error)
        {
            console.log(error)
        }
        getData()
    }
  return (
    <div className='container'>
      <h3 className='text-center text-dark'>Students List</h3> 
        <div className='row py-5'>
    <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Batch</th>
              <th>Teacher</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map((e,i)=>{
                    return <tr key={e.id}>
                        <td>{i+1}</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.mobile}</td>
                        <td>{e.batch}</td>
                        <td>{e.teacher}</td>
                        <td>
                            <Button variant="primary" onClick={()=>navigate(`/edit-student/${e.id}`)}>Edit</Button>
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

export default Studentlist