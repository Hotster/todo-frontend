import styles from "./LoginPage.module.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectUser, selectUserError, selectUserStatus } from "../../app/userSlice";
import { useLocation, useNavigate, Link } from "react-router-dom";
import validate from "../../validators/loginPageValidator";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button"
import SpinnerCircle from "../../components/Spinner/SpinnerCircle";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);
    const userError = useSelector(selectUserError);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors({});
        const validatedData = validate({ username, password });

        if (validatedData.isValid) {
            dispatch(loginUser({
                username: username,
                password: password,
            }));
        } else {
            setFormErrors(prev => validatedData.errors)
        }
    }

    useEffect(() => {
        user && location.state?.from
            ? navigate(location.state.from)
            : user && navigate("/")
    })

    return (
        <div className="container">
            <div className={styles.formContainer}>

                <form className={styles.form} onSubmit={handleSubmit}>

                    <div className={styles.formTitle}>
                        <div>Sign in</div>
                        {userStatus === "loading" && <SpinnerCircle />}
                    </div>

                    {userError ? <div className={styles.formError}>{userError}</div> : null}

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

                    <Button text="Login" className={styles.loginButton} />
                </form>

                <div className={styles.suggestion}>
                    Don't have an account?<br />
                    <Link to="/register" className={styles.link}>Create it now</Link>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;