import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
let renderCount = 0;
type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export const TutoForm = () => {
  //  we need to add formValues type when invoking the useForm
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  // the erros object conain individual field errors
  const { errors } = formState;

  renderCount++;

  function onSumbit(data: FormValues) {
    console.log("form clicked", data);
  }
  return (
    <div>
      <h2>
        <mark>Tuto: {Math.floor(renderCount / 2)}</mark>
      </h2>
      {/* automatique kol touched field todhher data f console  */}
      <form onClick={handleSubmit(onSumbit)}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          {/* <input type='text' id="username" name={name} ref={ref} onChange={onChange} onBlur={onBlur} /> */}
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                // value is obligatory to be filled
                value: true,
                message: "Should be filled",
              },
            })}
          />
          <span className="error">{errors.username?.message}</span>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              pattern: {
                // regex pattern for email
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            })}
          />
          <span className="error">{errors.email?.message}</span>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Should be filled",
              },
            })}
          />
          <span className="error">{errors.channel?.message}</span>
        </div>
        <button>Submit</button>
      </form>

      {/* DevTools to able clearly see that the library is tracking the field values! */}
      {/* control prop should be added, and assigned control object a value from form  */}
      <DevTool control={control} />
    </div>
  );
};
