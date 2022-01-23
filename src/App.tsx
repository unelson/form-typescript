// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// first I list all the types that will be included in my form
type UserSubmitForm = {
  name: string;
  location: string;
  telephone: number;
  email: string;
  textArea: string;
  acceptTerms: boolean;
};
// a validation schema setting out the validations for the different
// types listed above
const App: React.FC = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('A name is required')
      .min(3, 'Your name must be at least 3 characters')
      .max(20, 'Your name must not exceed 20 characters')
      .matches(/[a-zA-Z]/, 'Name must only include alphabetic characters'),
    location: Yup.string().min(
      2,
      'Your location must have at least two characters'
    ),
    /* I gave location a validation of at least two characters to account for countries like the UK and US, while still maintaining the intergrity of the form */
    email: Yup.string().email('Enter a valid email'),
    // commented out the company field but didn't delete it in case I wanted to bring it back later
    // company: Yup.string().min(
    //   3,
    //   'Your company name must be at least 3 characters'
    // ),
    telephone: Yup.string()
      .required('A telephone number is required')
      .matches(
        /[/^\(?0( *\d\)?){9,10}$/]/,
        'Telephone number must be a U.K based number'
      ),
    textArea: Yup.string()
      .min(20, 'Minimum 20 characters.')
      .max(500, '500 characters max.'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
  });

  // here we have an object containing the properties we need for our form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, touchedFields },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
    // console.log(touchedFields);
  };

  return (
    // the form fields, starting with name
    <div className="register-form">
      <form className="row col-md-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-sm-12 col-md-6 small-inputs">
          <div className="form-group">
            {/* <label className="label">Full name</label> */}
            <input
              type="text"
              placeholder="Your name"
              // pattern={/^([\w]{3,})+\s+([\w\s]{3,})+$/i}
              {...register('name')}
              className={`form-control ${errors.name ? 'is-invalid' : ''} ${
                touchedFields?.name && !errors.name ? 'is-valid' : ''
              }`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>

          {/* location */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Paris"
              {...register('location')}
              className={`form-control ${errors.location ? 'is-invalid' : ''} ${
                touchedFields?.location && !errors.location ? 'is-valid' : ''
              }`}
            />
            <div className="invalid-feedback">{errors.location?.message}</div>
          </div>

          {/* telephone */}
          <div className="form-group">
            <input
              type="tel"
              placeholder="Telephone"
              {...register('telephone')}
              className={`form-control ${
                errors.telephone ? 'is-invalid' : ''
              } ${
                touchedFields?.telephone && !errors.telephone ? 'is-valid' : ''
              }`}
            />
            <div className="invalid-feedback">{errors.telephone?.message}</div>
          </div>

          {/* email address */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Email Address"
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''} ${
                touchedFields?.email && !errors.email ? 'is-valid' : ''
              }`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
        </div>

        {/* text area */}
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label className="label">Who are your influences?</label>
            <textarea
              placeholder="The more detail the better..."
              {...register('textArea')}
              className={`textarea ${errors.textArea ? 'is-invalid' : ''} ${
                isValid ? 'is-valid' : ''
              }`}
              // I used isValid? here instead of touchedFields? as the latter kept messing with the size of my text area for some reason
              // isInvalid? requires the checkbox below to be ticked in order to render the success state
            />
            <div className="invalid-feedback">{errors.textArea?.message}</div>
          </div>

          {/* checkbox */}
          <div className="form-group form-check">
            <input
              type="checkbox"
              {...register('acceptTerms')}
              className={`form-check-input ${
                errors.acceptTerms ? 'is-invalid' : ''
              }`}
            />
            <label htmlFor="acceptTerms" className="form-check-label">
              I have read and agree to the terms.
            </label>
            <div className="invalid-feedback">
              {errors.acceptTerms?.message}
            </div>
          </div>

          <div className="form-group isSubmitted">
            <button type="submit" className="btn btn-primary w-100">
              Send
            </button>

            <button
              type="button"
              onClick={() => reset()}
              // I was tempted to change the styling to btn-outline-dark just to give it a bit of flavour, but managed to resist
              className="btn btn-link mt-3"
            >
              Clear form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;
