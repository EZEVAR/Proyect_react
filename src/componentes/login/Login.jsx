import { useState } from "react"
import { Link } from "react-router-dom"
import * as API from '../../servicios/servicio'

export function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mensajeError, setmensajeError] = useState('')

    const enviarForm = async (event)=>{
          event.preventDefault();
          const user = await API.Login({username, password}) 
          if(user.status){
            window.localStorage.setItem('usuario', JSON.stringify(user));
            setUsername('')
            setPassword('')
            window.location.reload(true) 
          }else{
            setmensajeError(user.mensaje)
            setTimeout(()=>{
                setmensajeError('')
            }, 5000)
          }
    }
    return (
        <div className="container">
            <form onSubmit={enviarForm}>
                <h3 className="letra_principal">Ingresar</h3>
                {
                    mensajeError?
                    <div className="alert alert-danger" role="alert">
                    {mensajeError}
                    </div>:''                }
               
                  <div className="form-floating">
                    <input 
                      type="text" 
                      className="form-control" 
                      required="required" 
                      id="floatingInput" 
                      placeholder="Usuario"
                      value={username}
                      onChange={(event)=>setUsername(event.target.value)}
                      />
                    <label for="floatingInput">Usuario</label>
                </div>

                <div className="form-floating">
                    <input 
                     type="password" 
                     className="form-control" 
                     required="required" 
                     id="floatingPassword" 
                     placeholder="Password"
                     value={password} 
                     onChange={(event)=>setPassword(event.target.value)}
                     />
                    <label for="floatingPassword">Contrase??a</label>
                </div>

                <div className="checkbox mb-3">
                    <label>
                    </label>
                        <input type="checkbox" value="Recordar" /><h6 className="letra_principal">Recordar</h6> 
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit"><i className="fa fa-sign-in"></i> Ingresar</button>
                <div className="checkbox mb-3">
                 <Link to={'/registro'} >
                 <h6 className="letra_principal">Registro</h6>
                 </Link>
                </div>
            </form>
        </div>
        
     )
}