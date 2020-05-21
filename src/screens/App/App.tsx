import React, { useState } from "react";
import css from "./App.module.scss";
import TextInput from "components/TextInput";
import Button from "components/Button";
import Select from "components/Select";
import isFodselsNummer from "util/isFodselsNummer";

interface Values {
  bilNummer: string;
  bonus: number;
  fodselsnummer: string;
  fornavn: string;
  etternavn: string;
  epost: string;
}

interface Errors {
  bilNummer?: string;
  fodselsnummer?: string;
  fornavn?: string;
  etternavn?: string;
  epost?: string;
}

export default function App() {
  const [values, setValues] = useState<Values>({
    bilNummer: "",
    bonus: 0,
    fodselsnummer: "",
    fornavn: "",
    etternavn: "",
    epost: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const validate = () => {
    const { bilNummer, fornavn, etternavn, fodselsnummer } = values;
    let foundErrors: Errors = {};

    const registreringsnummerRegExp = new RegExp("^[A-Z]{2}[0-9]{5}$");
    if (!bilNummer.match(registreringsnummerRegExp)) {
      foundErrors = { ...foundErrors, bilNummer: "Ugyldig bilnummer" };
    }

    if (!(fornavn.length > 0)) {
      foundErrors = { ...foundErrors, fornavn: "Fyll inn fornavnet ditt" };
    }

    if (!(etternavn.length > 0)) {
      foundErrors = { ...foundErrors, etternavn: "Fyll inn etternavnet ditt" };
    }

    if (!isFodselsNummer(fodselsnummer)) {
      foundErrors = { ...foundErrors, fodselsnummer: "Ugyldig fødselsnummer" };
    }

    if (true) {
      foundErrors = { ...foundErrors, epost: "Ugyldig epost" };
    }

    if (Object.keys(foundErrors).some((error) => error)) {
      setErrors(foundErrors);
      return false;
    }

    return true;
  };

  return (
    <div className={css.container}>
      <div className={css.innerContainer}>
        <h1 className={css.title}>Kjøp Bilforsikring</h1>
        <p className={css.ingress}>
          Det er fire forskjellige forsikringer å velge mellom.
          Ansvarsforsikring er lovpålagt om kjøretøyet er registrert og skal
          brukes på veien. I tillegg kan du utvide forsikringen avhengig av hvor
          gammel bilen din er og hvordan du bruker den.
        </p>

        <form>
          <TextInput
            onChange={handleChange}
            value={values.bilNummer}
            label="Bilens registreringsnummer"
            id={"bilNummer"}
            placeholder="e.g AB 12345"
            errorMessage={errors.bilNummer}
          />

          <Select
            id="bonus"
            label="Din bonus"
            onChange={handleChange}
            value={values.bonus}
          />

          <TextInput
            onChange={handleChange}
            value={values.fodselsnummer}
            label="Fødselsnummmer"
            id="fodselsnummer"
            placeholder="11 siffer"
            errorMessage={errors.fodselsnummer}
          />

          <div className={css.nameContainer}>
            <TextInput
              onChange={handleChange}
              value={values.fornavn}
              label="Fornavn"
              id="fornavn"
              placeholder="Ola"
              errorMessage={errors.fornavn}
            />

            <TextInput
              onChange={handleChange}
              value={values.etternavn}
              label="Etternavn"
              id="etternavn"
              placeholder="Nordmann"
              errorMessage={errors.etternavn}
            />
          </div>

          <TextInput
            onChange={handleChange}
            value={values.epost}
            label="Epost"
            id="epost"
            type="email"
            placeholder="myemail@domain.com"
            errorMessage={errors.epost}
          />

          <div className={css.buttons}>
            <Button title="Beregn pris" onClick={validate} />
            <Button title="Avbryt" variant="white" onClick={() => {}} />
          </div>
        </form>
      </div>
    </div>
  );
}
