import {useState} from 'react';

export const Form = ({ logFormData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const onFormSubmit = e => {
    e.preventDefault();
    logFormData(formData);
    // console.log(formData);
  }

  const onInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(`${e.target.name}`, e.target.value);
    setFormData({ ...formData, [name]: value });
  }

  const onClick = (e) => {
    console.log(e);
  }

  return (
    <form onSubmit={e => onFormSubmit(e)}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" onChange={onInputChange} />
      </div>
      <div>
        <label htmlFor="lastName">First Name</label>
        <input type="text" name="lastName" onChange={onInputChange} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" onChange={onInputChange} />
      </div>
      <button onClick={onClick} name="hello">Submit</button>
    </form>
  )
}