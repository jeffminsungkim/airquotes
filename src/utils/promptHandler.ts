import type { LanguageOutputType } from "@/components/Dropdown";
import type { SelectedVibeType } from "@/components/MultiSelectDropdown";
import type { MultiValue, SingleValue } from "react-select";

const EXTRA_REQUEST =
  "Make sure include the correct name or source of the speaker if it is possible, but do not contain any further details.";

export const promptHanlder = (
  languageOutput: SingleValue<LanguageOutputType>,
  vibes: MultiValue<SelectedVibeType>,
  generateCount: number
) => {
  const lang = languageOutput ? languageOutput.value : "English";
  const selectedVibes = vibes
    .filter(
      (selected) =>
        selected?.value !== "movies" && selected?.value !== "TV shows"
    )
    .map((vibe) => vibe?.value)
    .join(", ");
  const source = vibes
    .filter(
      (selected) =>
        selected?.value === "movies" || selected?.value === "TV shows"
    )
    .map((source) => source?.value)
    .join(", ");

  let intro = `Generate 2 ${
    selectedVibes ? selectedVibes : "famous"
  } quotes in ${lang}`;

  if (generateCount > 0) {
    intro = `Generate 2 ${
      selectedVibes ? selectedVibes : "famous"
    } quotes in ${lang}`;
  }

  if (!source) {
    return `${intro}. ${EXTRA_REQUEST}`;
  } else {
    return `${intro}. Quotes must from ${source}. ${EXTRA_REQUEST}`;
  }
};
