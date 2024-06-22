import React, { useState } from "react";
import useFormValidate from "./hooks/useFormValidate"; // Import the custom hook

const App = () => {
  const [isEditing, setIsEditing] = useState(true);
  const { values, errors, handleClick, validating } = useFormValidate({
    name: "",
    email: "",
    age: "",
    guestName: "",
    withGuest: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validating(values);
    if (isValid) {
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="w-50 mx-auto">
      <h1 className="text-center">Level -1</h1>
      {isEditing ? (
        <form
          className="bg-body-secondary p-4 rounded-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              name="name"
              value={values.name}
              onChange={handleClick}
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address:
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={values.email}
              onChange={handleClick}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputAge" className="form-label">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputAge"
              name="age"
              value={values.age}
              onChange={handleClick}
            />
            {errors.age && <small className="text-danger">{errors.age}</small>}
          </div>

          <div>
            <label className="mb-2 me-2">Are You attending with a guest:</label>
            <div className="d-block ms-3">
              <div className="form-check d-inline-block">
                <input
                  className="form-check-input"
                  type="radio"
                  name="withGuest"
                  id="yes"
                  checked={values.withGuest}
                  onChange={() =>
                    handleClick({
                      target: { name: "withGuest", value: true, type: "radio" },
                    })
                  }
                />
                <label className="form-check-label" htmlFor="yes">
                  Yes
                </label>
              </div>
              <div className="form-check d-inline-block ms-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="withGuest"
                  id="no"
                  checked={!values.withGuest}
                  onChange={() =>
                    handleClick({
                      target: {
                        name: "withGuest",
                        value: false,
                        type: "radio",
                      },
                    })
                  }
                />
                <label className="form-check-label" htmlFor="no">
                  No
                </label>
              </div>
            </div>
          </div>

          {values.withGuest && (
            <div className="mb-3 mt-4">
              <label htmlFor="guestName" className="form-label">
                Guest Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="guestName"
                name="guestName"
                value={values.guestName}
                onChange={handleClick}
              />
              {errors.guestName && (
                <small className="text-danger">{errors.guestName}</small>
              )}
            </div>
          )}

          <button type="submit" className="mt-3 btn btn-primary d-block">
            Submit
          </button>
        </form>
      ) : (
        <div className="bg-body-secondary p-4 rounded-4">
          <h3 className="text-center text-decoration-underline link-underline-danger">
            Summary
          </h3>
          <p>
            <strong>Name:</strong> {values.name}
          </p>
          <p>
            <strong>Email:</strong> {values.email}
          </p>
          <p>
            <strong>Age:</strong> {values.age}
          </p>
          <p>
            <strong>Attending with Guest:</strong>{" "}
            {values.withGuest ? "Yes" : "No"}
          </p>
          {values.withGuest && (
            <p>
              <strong>Guest Name:</strong> {values.guestName}
            </p>
          )}
          <button
            onClick={handleEdit}
            className="mt-3 btn btn-secondary d-block"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
