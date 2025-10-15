import { useState } from 'react'
import api from '../api'

export default function Auth(){
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username:'', email:'', password:'' })
  const [msg, setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    try{
      if(mode==='register'){
        await api.post('/auth/register', { username: form.username, email: form.email, password: form.password })
        setMsg('Registered successfully, please login')
        setMode('login')
      } else {
        const r = await api.post('/auth/login', { email: form.email, password: form.password })
        setMsg(r.data.message || 'Logged in')
      }
    }catch(err){
      setMsg(err?.response?.data?.message || 'Error')
    }
  }

  return (
    <div>
      <h2>{mode==='login'? 'Login':'Register'}</h2>
      <div className="card">
        <form onSubmit={submit}>
          {mode==='register' && <input placeholder="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />}
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
          <button>{mode==='login'? 'Login':'Register'}</button>
        </form>
        <p>
          {mode==='login'? 'No account?':'Already have an account?'}
          <button className="link-btn" onClick={()=>setMode(mode==='login'? 'register':'login')}>{mode==='login'? 'Register':'Login'}</button>
        </p>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  )
}
