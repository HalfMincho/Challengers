import { useCallback, useState } from "react";

export function useSignUp() {

  const [inputs, setInputs] = useState({
    name: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
  });
  
  const [check, setCheck] = useState({
    emailError: false,
    passwordError: false,
    passwordLengthError: false
  });

  const { name, password, passwordConfirm, nickname, email } = inputs;
  const { emailError, passwordError, passwordLengthError } = check;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs]);

  const onChangeEmail = useCallback(e => {
    const { name, value } = e.target;
    setCheck({
      ...check,
      [name]: !isEmail(value)
    });
  }, [check]);

  const onChangePassword = useCallback(e => {
    const { name, value } = e.target;
    setCheck({
      ...check,
      [name]: value.length < 8
    });
    setInputs({
      ...inputs,
      [name]: value
    });
  }, [check, inputs]);

  const onChangePasswordCheck = useCallback(e => {
    const { name, value } = e.target;
      setCheck({
        ...check,
        [name]: value !== password
      });
      setInputs({
        ...inputs,
        [name]: value
      });
    }, [check, password, inputs]);

  const isEmail = (email) => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(email);
  };


  return { name, password, passwordConfirm, nickname, email, emailError, passwordError, passwordLengthError, onChange, onChangeEmail, onChangePassword, onChangePasswordCheck };
}