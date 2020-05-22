import React, { useState } from "react";
import css from "./App.module.scss";
import TextInput from "components/TextInput";
import Button from "components/Button";
import Select from "components/Select";
import isFodselsNummer from "util/isFodselsNummer";
import { isEmail, isCarNumber } from "util/validators";
import { formatMoney } from "util/format";

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
  const [isValid, setIsValid] = useState<Boolean>(false);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const validate = () => {
    //reset errors
    setErrors({});
    let foundErrors: Errors = {};
    const { bilNummer, fornavn, etternavn, fodselsnummer, epost } = values;

    if (!isCarNumber(bilNummer)) {
      foundErrors = {
        ...foundErrors,
        bilNummer: "Skriv inn et gyldig bilnummer (e.g AB 12345)",
      };
    }

    if (!(fornavn.length > 0)) {
      foundErrors = { ...foundErrors, fornavn: "Fyll inn fornavnet ditt" };
    }

    if (!(etternavn.length > 0)) {
      foundErrors = { ...foundErrors, etternavn: "Fyll inn etternavnet ditt" };
    }

    if (!isFodselsNummer(fodselsnummer)) {
      foundErrors = {
        ...foundErrors,
        fodselsnummer: "Skriv inn et gyldig fødselsnummer (e.g 12345612345)",
      };
    }

    if (!isEmail(epost)) {
      foundErrors = {
        ...foundErrors,
        epost: "Skriv inn en gyldig epostadresse (e.g test@mail.com)",
      };
    }

    if (Object.keys(foundErrors).some((error) => error)) {
      setErrors(foundErrors);
      setIsValid(false);
      return;
    }
    setIsValid(true);
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
            placeholder="Velg bonus"
            helpText="Hjelpetekst står her"
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
            placeholder="myemail@domain.com"
            errorMessage={errors.epost}
          />

          <div className={css.buttons}>
            <Button title="Beregn pris" onClick={validate} />
            <Button title="Avbryt" variant="white" onClick={() => {}} />
          </div>
        </form>
      </div>

      {isValid && (
        <p className={css.price}>
          Estimert pris: {formatMoney(values.bonus * 500)}
        </p>
      )}
    </div>
  );
}
