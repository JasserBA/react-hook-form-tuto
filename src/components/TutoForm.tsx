import { useForm } from "react-hook-form"
import {DevTool} from "@hookform/devtools"

export const TutoForm = () => {
  const form = useForm();
  const {register, control} = form
  return (
    <div>
        <form >
            <label htmlFor="username">Username</label>
            {/* <input type='text' id="username" name={name} ref={ref} onChange={onChange} onBlur={onBlur} /> */}
            <input type='text' id="username" {...register("username")} />

            <label htmlFor="email">Email</label>
            <input type='text' id="email" {...register("email")}/>
            
            <label htmlFor="channel">Channel</label>
            <input type='text' id="channel" {...register("channel")}/>

            <button>Submit</button>
        </form>
         
         {/* DevTools to able clearly see that the library is tracking the field values! */}
         {/* control prop should be added, and assigned control object a value from form  */}
        <DevTool control={control}/>
    </div>
  )
}
