import styles from "./RegisterPage.module.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectUser, selectUserError, selectUserStatus } from "../../app/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import validate from "../../validators/registerPageValidator";
import SpinnerCircle from "../../components/Spinner/SpinnerCircle";


const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);
    const userError = useSelector(selectUserError);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors({});
        const validatedData = validate({ username, password, rePassword });

        if (validatedData.isValid) {
            dispatch(registerUser({
                username: username,
                password: password,
                rePassword: rePassword
            }));
        } else {
            setFormErrors(prev => validatedData.errors)
        };
    };

    useEffect(() => {
        console.log(userError)
        {userError?.detail && setFormErrors(prev => userError.detail)}
        { user && navigate("/") }
    }, [userError, user])

    return (
        <div className="container">
            <div className={styles.formContainer}>

                <form className={styles.form} onSubmit={handleSubmit}>

                    <div className={styles.formTitle}>
                        <div>Sign up</div>
                        {userStatus === "loading" && <SpinnerCircle />}
                    </div>

                    {userError ? <div className={styles.formError}>{userError.message}</div> : null}

                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username</label>
                        <Input type="text"
                            id="username"
                            state={username}
                            setState={setUsername}
                            invalid={formErrors.username !== undefined} />
                        {formErrors.username === undefined
                            ? null
                            : <ul>{formErrors.username.map((error, index) => (
                                <li key={index} className={styles.formError}>{error}</li>))}
                            </ul>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <Input type="password"
                            id="password"
                            state={password}
                            setState={setPassword}
                            invalid={formErrors.password !== undefined} />
                        {formErrors.password === undefined
                            ? null
                            : <ul>{formErrors.password.map((error, index) => (
                                <li key={index} className={styles.formError}>{error}</li>))}
                            </ul>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="rePassword">Repeat your password</label>
                        <Input type="password"
                            id="rePassword"
                            state={rePassword}
                            setState={setRePassword}
                            invalid={formErrors.rePassword !== undefined} />
                        {formErrors.rePassword === undefined
                            ? null
                            : <ul>{formErrors.rePassword.map((error, index) => (
                                <li key={index} className={styles.formError}>{error}</li>))}
                            </ul>}
                    </div>

                    <Button text="Register" className={styles.registerButton} />
                </form>

                <div className={styles.suggestion}>
                    Have already an account?<br />
                    <Link to="/login" className={styles.link}>Login here</Link>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;
