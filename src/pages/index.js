import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import Weather from "@/components/Weather";
import Spinner from "@/components/Spinner";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
    setCity("");
    setLoading(false);
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <Head>
        <title>Weather App</title>
      </Head>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-[1]" />
      {/* Background image */}
      <Image
        src="https://media.istockphoto.com/id/1404476713/photo/dramatic-sunset-on-the-beach.jpg?s=612x612&w=0&k=20&c=KGglRMmkiwCqkjKOrlYM4xLpXWY6vtivV7MQQ1goMo8="
        alt="clouds"
        layout="fill"
        className="object-cover z-[-1]"
      />

      {/* Search */}
      <div className="relative flex justify-between items-center max-w-[500px] m-auto pt-4 text-white z-[10]">
        <form
          onSubmit={fetchWeather}
          className="flex justify-between items-center w-full m-auto p-3 bg-transparent border
        border-gray-300 text-white rounded-2xl"
        >
          <div>
            <input
              className="bg-transparent border-none text-white focus:outline-none text-2xl"
              type="text"
              value={city}
              placeholder="Search city"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button type="submit">
            <BsSearch size={20} />
          </button>
        </form>
      </div>
      {/* Weather Information */}
      {weather.main && <Weather data={weather} />}
    </div>
  );
}
