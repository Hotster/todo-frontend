const validate = (data) => {
    const validatedData = {
        username: data.username,
        password: data.password,
        isValid: true,
        errors: {}
    }

    const usernameErrors = [];
    const passwordErrors = [];

    if (data.username === "") {
        usernameErrors.push("This field is required.");
    };

    if (data.password === "") {
        passwordErrors.push("This field is required.");
    }
    
    if (usernameErrors.length) {
        validatedData.errors.username = usernameErrors;
    };

    if (passwordErrors.length) {
        validatedData.errors.password = passwordErrors;
    };

    if (Object.keys(validatedData.errors).length) {
        validatedData.isValid = false;
    };

    return validatedData;
}

export default validate;