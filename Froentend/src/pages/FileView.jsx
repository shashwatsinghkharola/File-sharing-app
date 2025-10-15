import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

export default function FileView(){
  const { uuid } = useParams()
  const [file, setFile] = useState(null)
  const [mail, setMail] = useState({ emailTo:'', emailFrom:'' })
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    api.get(`/files/${uuid}`).then(r=>setFile(r.data)).catch(()=>setFile(null))
  },[uuid])

  const sendMail = async (e) => {
    e.preventDefault()
    try{
      await api.post('/files/send', { uuid, ...mail })
      setMsg('Email sent')
    }catch(err){
      setMsg(err?.response?.data?.error || 'Error')
    }
  }

  if(file===null) return <p>Loading...</p>
  if(!file) return <p>File not found or expired.</p>

  return (
    <div>
      <h2>File details</h2>
      <div className="card">
        <p><strong>Name:</strong> {file.filename}</p>
        <p><strong>Size:</strong> {file.size} bytes</p>
  <a href={`/files/downloads/${file.uuid}`} className="btn">Download</a>
      </div>

      <div className="card">
        <h3>Send via Email</h3>
        <form onSubmit={sendMail}>
          <input placeholder="Your email" value={mail.emailFrom} onChange={e=>setMail({...mail, emailFrom:e.target.value})} />
          <input placeholder="Recipient email" value={mail.emailTo} onChange={e=>setMail({...mail, emailTo:e.target.value})} />
          <button>Send</button>
        </form>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  )
}
