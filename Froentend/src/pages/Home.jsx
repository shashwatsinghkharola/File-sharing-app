import { useState } from 'react'
import api from '../api'

export default function Home(){
  const [file, setFile] = useState(null)
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)

  const upload = async (e) => {
    e.preventDefault()
    if(!file) return alert('Select a file')
    const form = new FormData()
    form.append('myfile', file)
    setLoading(true)
    try{
      const res = await api.post('/files', form, { headers: { 'Content-Type': 'multipart/form-data' } })
      setLink(res.data.file)
    }catch(err){
      alert(err?.response?.data?.error || err.message)
    }finally{setLoading(false)}
  }

  return (
    <div>
      <h2>Share a file</h2>
      <form onSubmit={upload} className="card">
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button disabled={loading}>{loading? 'Uploading...':'Upload & Get Link'}</button>
      </form>

      {link && (
        <div className="card">
          <p>File uploaded successfully. Share this link:</p>
          <input readOnly value={link} style={{width:'100%'}} />
        </div>
      )}
    </div>
  )
}
