import React, { useState } from "react";

interface IValidation {
    required?: boolean;
    preventKeyPress?: boolean;
    validateEmail?: boolean;
    pattern?: RegExp;
}

type ReturnType = [
    string,
    (e: React.ChangeEvent<{ value: string }>) => void,
    boolean?,
    (() => void)?
];

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Handle validation. Usage:
 * ```
 * const
 *   [firstName, handleFirstNameChange, firstNameError, handleFirstNameBlur] = useInputField("Tony", { required: true });
 * <TextField
 *   value={firstName}
 *   onChange={handleFirstNameChange}
 *   error={firstNameError}
 *   onBlur={handleFirstNameBlur}
 *   helperText={firstnameError && "Please enter first name."}
 *   required
 *   />
 * ```
 * @param initialValue Initial value
 * @param validation Validation options
 * @returns A stateful value, onChange handler, error state, onBlur handler
 */
export default function useInputField(
    initialValue?: string,
    validation?: IValidation
): [
    string,
    (e: React.ChangeEvent<{ value: string }>) => void,
    boolean,
    (e: React.FocusEvent) => void
] {
    const [value, setValue] = useState(initialValue || "");
    const [error, setError] = useState(false);

    function handleInputChange(e: React.ChangeEvent<{ value: string }>) {
        // Done first to avoid any validation issues
        setValue(e.target.value);
        let value = e.target.value.trim();

        let valid = validateRequired(value) && validateEmail(value);

        setError(!valid);
    }

    function handleBlur() {
        let check = value.trim();
        setValue(check);
        let valid = validateRequired(check) && validateEmail(check);
        setError(!valid);
    }

    function validateRequired(value: string) {
        return (
            !validation ||
            (validation.required && !!value) ||
            !validation.required
        );
    }

    function validateEmail(value: string) {
        return (
            !validation ||
            (validation.validateEmail && emailRegex.test(value)) ||
            !validation.validateEmail
        );
    }

    return [value, handleInputChange, error, handleBlur];
}
