import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import countryCodeMap, { ICountryCodeMap } from "../../util/country-code-map";
import { IQualiSeason } from "../../interfaces";

interface IProps {
  qualiSeason: IQualiSeason;
}

function SeasonResult({ qualiSeason }: IProps) {
  return (
    <Box>
      {qualiSeason.results.map((result) => (
        <Link
          key={result.raceName}
          href={`/qualifying/${qualiSeason.year}/${result.round}`}
          passHref
        >
          <Box
            p="8px"
            borderWidth="1px"
            mb="8px"
            borderRadius="8px"
            style={{ cursor: "pointer" }}
          >
            <Flex gap={8} alignItems="center">
              <Stack spacing="0">
                <Image
                  style={{ borderRadius: "3px" }}
                  width="80"
                  height="55"
                  objectFit="fill"
                  src={`https://flagcdn.com/h80/${
                    countryCodeMap[result.country as keyof ICountryCodeMap]
                  }.png`}
                  alt={result.country}
                />
              </Stack>
              <Stack spacing="0">
                <Heading as="h3" size="lg">
                  {result.raceName}
                </Heading>
                <Text>{result.circuit.name}</Text>
                <Text fontSize="sm" fontWeight="bold">
                  Pole position: {result.fastestLap.Driver.givenName}{" "}
                  {result.fastestLap.Driver.familyName} - {result.fastestLap.Q3}
                </Text>
              </Stack>
            </Flex>
          </Box>
        </Link>
      ))}
    </Box>
  );
}

export default SeasonResult;
