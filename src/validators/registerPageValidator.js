const validate = (data) => {
    const validatedData = {
        username: data.username,
        password: data.password,
        rePassword: data.rePassword,
        isValid: true,
        errors: {}
    }

    const usernameErrors = [];
    const passwordErrors = [];
    const rePasswordErrors = []

    if (data.username === "") {
        usernameErrors.push("This field is required.");
    };

    if (!data.username.match(/^.{3,18}$/)) {
        usernameErrors.push("Username must be at least 3 characters and no more than 20 characters.")
    }

    if (!data.username.match(/^[A-Za-z0-9]*$/)) {
        usernameErrors.push("User name must contain only letters and numbers.")
    }

    if (data.password === "") {
        passwordErrors.push("This field is required.");
    }

    if (!data.password.match(/^.{8,18}$/)) {
        passwordErrors.push("Password must be at least 8 characters and no more than 20 characters.")
    }

    if (!data.password.match(/^(?=.*\d).+$/)) {
        passwordErrors.push("Password must contain a digit.")
    }

    if (!data.password.match(/^(?=.*[A-Za-z]).+$/)) {
        passwordErrors.push("Password must contain a letter.")
    }
    
    if (data.rePassword === "") {
        rePasswordErrors.push("This field is required.");
    }

    if (data.rePassword !== data.password) {
        rePasswordErrors.push("Passwords do not match.");
    }
    
    if (usernameErrors.length) {
        validatedData.errors.username = usernameErrors;
    };

    if (passwordErrors.length) {
        validatedData.errors.password = passwordErrors
    };

    if (rePasswordErrors.length) {
        validatedData.errors.rePassword = rePasswordErrors;
    };

    if (Object.keys(validatedData.errors).length) {
        validatedData.isValid = false;
    };

    return validatedData;
}

export default validate;