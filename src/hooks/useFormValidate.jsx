import { useState } from "react";

const useFormValidate = (initial) => {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  const handleClick = (e) => {
    const { name, value, type } = e.target;
    setValues({
      ...values,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const validating = (fields) => {
    const newErrors = {};
    if (fields.name.trim() === "") newErrors.name = "Name is required.";
    if (fields.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters.";
    if (!fields.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Email is invalid.";
    if (fields.age <= 0 || isNaN(fields.age))
      newErrors.age = "Age must be a number greater than 0.";
    if (fields.withGuest && fields.guestName.trim() === "")
      newErrors.guestName = "Guest Name is required.";
    if (fields.withGuest && fields.guestName.trim().length < 3)
      newErrors.guestName = "Guest Name must be at least 3 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    handleClick,
    validating,
  };
};

export default useFormValidate;
