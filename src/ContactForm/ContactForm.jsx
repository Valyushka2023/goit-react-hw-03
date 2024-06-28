import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const phoneNumberFormat = /^\d{3}-\d{2}-\d{2}$/;


const contactSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long'),
  number: yup
    .string()
    .required('Phone number is required')
    .matches(phoneNumberFormat, 'Phone number must be in xxx-xx-xx format'),
});

const ContactForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={contactSchema}
      onSubmit={(values, { resetForm }) => {
        const newContact = {
          id: nanoid(),
          name: values.name,
          number: values.number,
        };
        onSubmit(newContact);
        resetForm();
      }}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => (
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.field}>
            <label htmlFor="name">Name</label>
            <Field
              id="name"
              name="name"
              type="text"
              className={css.input}
              onChange={handleChange}
              value={values.name}
            />
            {touched.name && errors.name && (
              <ErrorMessage name="name" component="div" className={css.errorText} />
            )}
          </div>
          <div className={css.field}>
            <label htmlFor="number">Number</label>
            <Field
              id="number"
              name="number"
              type="tel"
              className={css.input}
              onChange={handleChange}
              value={values.number}
            />
            {touched.number && errors.number && (
              <ErrorMessage name="number" component="div" className={css.errorText} />
            )}
          </div>
          <button type="submit" className={css.button}>
            Add Contact
          </button>
        </form>
      )}
    </Formik>
  );
};

export default ContactForm;