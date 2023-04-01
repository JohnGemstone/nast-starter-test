import { TextInput, Flex, Box, Card, Code } from "@sanity/ui";
import { useCallback } from "react";
import { StringInputProps, set, unset } from "sanity";
import { siteName } from "@/data/globals";

export const TitleWithSuffix = (props: StringInputProps) => {
  const { elementProps, onChange, value = "" } = props;

  const suffix = " | " + siteName;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(event.currentTarget.value ? set(event.currentTarget.value + suffix) : unset()),
    [onChange]
  )
  
  // format title
  const formatTitleForRender = useCallback((title: string) => {
    if (title.endsWith(suffix)) {
      return title.substring(0, title.length - suffix.length);
    }
    return title;
  },[value]);

  return (
    <Flex >
      <Box flex={3}>
        <TextInput {...elementProps} value={formatTitleForRender(value)} onChange={handleChange} style={{borderRight: "0"}} />
      </Box>

  
      <Flex
        as={Card}
        align="center"
          paddingRight={3}
          //@ts-expect-error
          border
          borderLeft={false}
          style={{ pointerEvents: "none" }}
        >
        <Code size={1}>{suffix}</Code>
      </Flex>

    </Flex>
  );
};


  // const handleChange = useCallback(
  //   (event: FormEvent<HTMLInputElement>) => {
  //     const nextValue = event.currentTarget.value;
  //     // onChange(nextValue ? set(nextValue + suffix) : unset());
  //     onChange(nextValue ? set(nextValue) : unset());
  //   },
  //   [onChange]
  // );


  // const handleChange = (event: FormEvent<HTMLInputElement>) => {
  //   const nextValue = event.currentTarget.value
  //   onChange(nextValue ? set(nextValue) : unset())
	// }

  // const handleChange = (event: FormEvent<HTMLInputElement>) => {
  //   console.log("do nuffin", elementProps)
	// }

