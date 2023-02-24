import geocodingService from "@mapbox/mapbox-sdk/services/geocoding";
import mbxClient from "@mapbox/mapbox-sdk";
import { Combobox, Select, SelectValue } from "ui";
import React from "react";

interface FormatDataResponse {
  lat: number;
  lng: number;
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
    // field.onChange(value?.label || "");
    if (value?.item) {
      const lat = value?.item?.geometry?.coordinates[0];
      const lng = value?.item?.geometry?.coordinates[1];

      const cityAttr = value?.item.id.startsWith("place")
        ? value?.item
        : value?.item.context.find(({ id }) => id.startsWith("place"));

      const regionAttr = value?.item.id.startsWith("region")
        ? value?.item
        : value?.item.context.find(({ id }) => id.startsWith("region"));

      const countryAttr = value?.item.context.find(({ id }) =>
        id.startsWith("country")
      );

      const city = cityAttr.text;
      const region = regionAttr.short_code.split("-")[1];

      console.log("Formatted: ", value);

      return onChange({
        lat,
        lng,
        city,
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
          types: ["place", "neighborhood"],
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
      onSelect={(option) => setSelected(option)}
    />
  );
};
