import { Formik, Form, Field } from "formik";
import React from "react"

const ProfileDataForm = ({profile,onSubmitForm}) => {
    return <Formik
    initialValues = {{
      fullName: '',
      lookingForAJob: '',
      lookingForAJobDescription: ''

  }}
  onSubmit = { (values)  => {
      onSubmitForm(values);
     
  }
  }
    >
      {(formik) => (
        <Form>
            <div>
            <label><b>Full name</b></label>
            <Field  name='fullName' component='input' placeholder='Full name' />
        </div>
            <div>
            <label><b>Looking for a job</b></label>
            <Field  name='lookingForAJob' type='checkbox' />
            </div>
            <div>
            <label><b>Professional skills</b></label>
            <Field name='lookingForAJobDescription' component='textarea' placeholder='Professional skills' /> 
            </div>
            <div>
            <label><b>About me</b></label>
            <Field name='aboutMe' component='textarea' placeholder='About me' /> 
            </div>
            <div>
            <label><b>Contacts</b></label>: {Object.keys(profile.contacts).map(key => {
                return <div> 
                    <b>key</b>: <Field name={'contacts.'+key} component='input' placeholder={key} />
                    </div>
            })}
            </div>
            <div><button type='submit'>Save</button></div>
            {/* <div>
        {formik.status ? <span>{formik.status}</span>: null}
            </div> */}
        </Form>
        )}

    </Formik>
  }

  export default ProfileDataForm;