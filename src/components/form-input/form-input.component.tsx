import { InputHTMLAttributes } from "react";
// import "./form-input.style.module.scss";
import "./form-input.style.scss";

type FormInputProps = {
  label: string;
  value: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({ label, ...otherProps }: FormInputProps) => {
  return (
    <div className={"form-input_group"}>
      <input className={"form_input"} {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form_input_label`}
        >
          {label}
        </label>
      )}
      {otherProps.error && <span className="error-text">{otherProps.error}</span>}
    </div>
  );
};

export default FormInput;
