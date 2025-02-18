import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import emailjs from "emailjs-com";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    x: string;
    reddit: string;
  };
  phoneNumber: Array<string>;
  phNumbers: {
    number: string;
  }[];
  age: number;
  dateOfBirth: Date;
};

export const TutoForm = () => {
  //  we need to add formValues type when invoking the useForm
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/9"
      );
      const data = await response.json();
      return {
        username: "jasser",
        email: data.email,
        channel: "",
        social: {
          x: "s",
          reddit: "s",
        },
        phoneNumber: ["qsd", ""],
        phNumbers: [{ number: "" }],
        age: 19,
        dateOfBirth: new Date(),
      };
    },
  });
  const { register, control, handleSubmit, formState, reset } = form;
  // the erros object conain individual field errors
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitSuccessful,
  } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  renderCount++;

  function handleSendEmail(data: FormValues) {
    // Your EmailJS service/template/publicKey
    const serviceId = "service_5a4s1kc";
    const templateId = "template_g72szmc";
    const publicKey = "cmqQqmx3z83_eMQMV";

    // Create a new object that contains dynamic template parameters
    const templateParams = {
      username: data.username,
      email: data.email,
      channel: data.channel,
    };

    // Send email via EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully:", response);
        reset();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  /*  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
*/
  function onSumbit(data: FormValues) {
    console.log("form clicked", data);
    handleSendEmail(data);
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
              // could validate custom rule
              // as key, maybe we need specify a name for the validation rule
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@gmail.com" ||
                    "Enter a different email address!"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domaine is spammy or suspicious emails!"
                  );
                },
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length === 0 || "Email already exists";
                },
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

        <div className="form-control">
          <label htmlFor="x">X</label>
          <input
            type="text"
            id="x"
            {...register("social.x", {
              required: {
                value: true,
                message: "Should be filled",
              },
            })}
          />
          <span className="error">{errors.social?.x?.message}</span>
        </div>

        <div className="form-control">
          <label htmlFor="reddit">Reddit</label>
          <input
            type="text"
            id="reddit"
            {...register("social.reddit", {
              required: {
                value: true,
                message: "Should be filled",
              },
            })}
          />
          <span className="error">{errors.social?.reddit?.message}</span>
        </div>

        <div className="form-control">
          <label htmlFor="phoneNumber">phoneNumber</label>
          <input
            type="text"
            id="phoneNumber"
            {...register("phoneNumber.0", {
              required: {
                value: true,
                message: "Should be filled",
              },
            })}
          />
          <span className="error">{errors.phoneNumber?.[0]?.message}</span>
        </div>

        <div className="form-control">
          <label htmlFor="phoneNumber">phoneNumber</label>
          <input
            type="text"
            id="phoneNumber"
            {...register("phoneNumber.1", {
              required: {
                value: true,
                message: "Should be filled",
              },
            })}
          />
          <span className="error">{errors.phoneNumber?.[1]?.message}</span>
        </div>

        <div>
          <h2>List of fields</h2>
          <div>
            {fields.map((f, index) => (
              <div className="form-control" key={f.id}>
                <label htmlFor={`phoneNumber-${index}`}>Phone Number</label>
                <input
                  type="text"
                  id={`phoneNumber-${index}`}
                  {...register(`phNumbers.${index}.number` as const)}
                />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Delete
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone NUMBER
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Should be filled",
              },
            })}
          />
          <span className="error">{errors.age?.message}</span>
        </div>

        <div className="form-control">
          <label htmlFor="dateOfBirth">DateOfBirth</label>
          <input
            type="date"
            id="dateOfBirth"
            {...register("dateOfBirth", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Should be filled",
              },
            })}
          />
          <span className="error">{errors.dateOfBirth?.message}</span>
        </div>
        <button disabled={!isDirty || !isValid} onClick={() => reset()}>
          Submit
        </button>
      </form>

      {/* DevTools to able clearly see that the library is tracking the field values! */}
      {/* control prop should be added, and assigned control object a value from form  */}
      <DevTool control={control} />
    </div>
  );
};
