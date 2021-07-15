import { Form } from './Form';

export const Parent = () => {
  const logFormData = (data) => {
    console.log("Parent componenet is logging the data from the child");  
  }

  return (
    <div>
      <h2>Parent</h2>
      <Form logFormData={logFormData}></Form>
    </div>
  )
}