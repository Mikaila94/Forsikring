import React from "react";
import css from "./TextInput.module.scss";

interface Props {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value: string | number;
  id: string;
  label: string;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
}

export default function TextInput({
  onChange,
  value,
  id,
  label,
  className,
  placeholder,
  errorMessage,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
  };

  return (
    <div className={`${css.textInputContainer} inputElement ${className}`}>
      <label className={css.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        className={css.textInput}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
      {errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
