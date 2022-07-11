import defaultAxios from "axios";
import calculateTimeDifference from "../util/calculate-time-difference";

const axios = defaultAxios.create({ baseURL: "https://ergast.com/api/f1/" });

export const getYearQualifyingResults = async (selectedSeason) => {
  const response = await axios.get(
    `${selectedSeason}/qualifying.json?limit=600`
  );
  const seasonResults = response.data;
  const races = seasonResults.MRData.RaceTable.Races;

  return {
    year: seasonResults.MRData.RaceTable.season,
    results: races.map((race) => ({
      circuit: {
        id: race.Circuit.circuitId,
        name: race.Circuit.circuitName,
      },
      country: race.Circuit.Location.country,
      date: race.date,
      fastestLap: race.QualifyingResults[0],
      raceName: race.raceName,
      round: race.round,
      season: race.season,
    })),
  };
};

export const getRoundQualifyingResult = async (round, year) => {
  const response = await axios.get(`${year}/${round}/qualifying.json`);

  if (response.data.MRData) {
    const qualiData = response.data.MRData.RaceTable.Races[0];
    const results = qualiData.QualifyingResults;
    const polePositionLapTime = results[0].Q3;

    return {
      raceName: qualiData.raceName,
      circuit: qualiData.Circuit.circuitName,
      results: results.map((result, index) => ({
        position: result.position,
        driver: result.Driver.givenName + " " + result.Driver.familyName,
        driverId: result.Driver.driverId,
        driverNumber: result.number,
        driverCode: result.Driver.code,
        constructor: result.Constructor.name,
        constructorId: result.Constructor.constructorId,
        qualifyingSessions: [
          result["Q1"] ?? "",
          result["Q2"] ?? "",
          result["Q3"] ?? "",
        ],
        qualifyingTime: result.Q3 || result.Q2 || result.Q1,
        delta: (index !== 0 && result.Q3) ? calculateTimeDifference(polePositionLapTime, result["Q3"]) : ""
      })),
    };
  }

  return {};

  // console.log(qualiData);
};

export const getListOfSeasons = async () => {
  const response = await axios.get("seasons.json?limit=100");
  const listOfSeasons = response.data;
  return listOfSeasons.MRData.SeasonTable.Seasons.map(
    (season) => season.season
  );
};
