import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./signin-form.styles.scss";
import Button from "../button/button.component";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

const defaultFormField = {
  email: "",
  password: "",
};

const signinWithGoogle = async () => {
  const { user } = await signInWithGooglePopup();
  await createUserDocumentFromAuth(user);
};

const SigninForm = () => {
  const [formFields, setFormFields] = useState(defaultFormField);

  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setFormFields(defaultFormField);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password");
          break;
        case "auth/user-not-found":
          alert("No user with the email");
          break;
        default:
          alert(error.code);
      }
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  return (
    <div className="signin-container">
      <h2>Already have an account?</h2>
      <h3>Signin with you email and password</h3>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          required
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          required
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={signinWithGoogle}>
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
