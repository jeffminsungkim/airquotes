import type { SingleValue } from "react-select";
import Select from "react-select";

type DropdownProps = {
  languageOutput: SingleValue<LanguageOutputType>;
  setLanguageOutput: (languageOutput: SingleValue<LanguageOutputType>) => void;
};

export type LanguageOutputType = (typeof languages)[number];

const languages = [
  { value: "English", label: "English" },
  { value: "Korean", label: "Korean" },

  { value: "Mandrain or Chinese", label: "Chinese(Mandrain)" },
  { value: "Hindi", label: "Hindi" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "Russian", label: "Russian" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Indonesian", label: "Indonesian" },
  { value: "German", label: "German" },
  { value: "Japanese", label: "Japanese" },
  { value: "Vietnamese", label: "Vietnamese" },
];

const Dropdown = ({ languageOutput, setLanguageOutput }: DropdownProps) => {
  const handleChange = (selectedOption: SingleValue<LanguageOutputType>) => {
    setLanguageOutput(selectedOption);
  };

  return (
    <div>
      <Select
        instanceId="langSelect"
        classNames={{
          control: (state) => `p-0.5 w-full rounded-md`,
        }}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            // This line disable the blue border
            // boxShadow: 'none',
            borderColor: "none",
            cursor: "pointer",
            "&:hover": {
              borderColor: "none",
            },
            transition: "all ease 0s 0s",
          }),
          option: (base) => {
            return {
              ...base,
              color: "black",
              cursor: "pointer",
              backgroundColor: `white`,
              ":hover": {
                backgroundColor: "#F5F5F5",
              },
            };
          },
          clearIndicator: (baseStyles) => {
            return {
              ...baseStyles,
              cursor: "pointer",
            };
          },
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "black",
          },
        })}
        defaultValue={languageOutput}
        options={languages}
        onChange={(data) => handleChange(data)}
        isSearchable={true}
      />
    </div>
  );
};

export default Dropdown;
