import geocodingService from "@mapbox/mapbox-sdk/services/geocoding";
import mbxClient from "@mapbox/mapbox-sdk";
import { Combobox, Select, SelectValue } from "ui";
import React from "react";

interface FormatDataResponse {
  lat: number;
  lng: number;
  country: string;
  neighborhood: string;
  city: string;
  region: string;
  value: string;
}

interface GeocoderProps {
  onChange: (area: FormatDataResponse) => void;
  value?: any;
  placeholder?: string;
  defaultValue?: string;
}

interface MapboxGeocodeContext {
  id: string;
  text: string;
  wikidata?: string;
  short_code?: string;
}

interface MapboxGeocodeFeature {
  id: string;
  type: "Feature";
  place_type: string[];
  relevance: number;
  properties: any;
  text: string;
  place_name: string;
  center: [number, number];
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  bbox: [number, number, number, number];
  context: MapboxGeocodeContext[];
}

export const Geocoder = ({
  onChange,

  placeholder,
  value,
  defaultValue,
}: GeocoderProps) => {
  const [selected, setSelected] = React.useState<SelectValue | null>(null);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SelectValue[]>([]);
  const baseClient = mbxClient({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  });
  const geocoder = geocodingService(baseClient);

  const formatData = (value: SelectValue) => {
    console.log("value: ", value);
    // field.onChange(value?.label || "");
    if (value) {
      const lat = value?.geometry?.coordinates[0];
      const lng = value?.geometry?.coordinates[1];

      const neighborhoodAttr = value.id?.startsWith("neighborhood")
        ? value
        : value.context?.find(({ id }: { id: string }) =>
            id.startsWith("neighborhood")
          );

      const regionAttr = value.id?.startsWith("region")
        ? value
        : value.context?.find(({ id }: { id: string }) =>
            id.startsWith("region")
          );

      const cityAttr = value.id.startsWith("place")
        ? value
        : value.context.find(({ id }: { id: string }) =>
            id.startsWith("place")
          );

      const countryAttr = value.id?.startsWith("country")
        ? value
        : value.context?.find(({ id }: { id: string }) =>
            id.startsWith("country")
          );

      console.log("countryAttr: ", countryAttr);

      const country = countryAttr.text;
      const region = regionAttr?.short_code.split("-")[1];
      const neighborhood = neighborhoodAttr ?? "";
      const city = cityAttr.text;

      console.log("neighborhood: ", neighborhood);

      console.log("Formatted: ", value);

      return onChange({
        lat,
        lng,
        country,
        city,
        neighborhood,
        region,
        value: value.value,
      });
    }
  };

  React.useEffect(() => {
    const fetchLocations = async () => {
      const res = await geocoder
        .forwardGeocode({
          query: query,
          types: ["neighborhood", "country", "region", "place"],
        })
        .send();
      if (!res.body.features || res.body.features.length === 0) return null;
      const formatted = res.body.features.map((item: MapboxGeocodeFeature) => ({
        value: item.place_name,
        name: item.place_name,
        ...item,
      }));

      setResults(formatted);
    };

    fetchLocations();
    console.log("results: ", results);
  }, [query]);

  return (
    <Select
      options={results}
      value={selected!}
      onChange={setQuery}
      onSelect={(option) => {
        console.log("option: ", option);
        formatData(option);
        setSelected(option);
      }}
    />
  );
};
