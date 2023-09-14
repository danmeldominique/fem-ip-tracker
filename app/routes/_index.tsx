import { type ActionArgs, json, type V2_MetaFunction, type LoaderArgs } from "@remix-run/node";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import IpTile from "~/components/IpTile";
import ClientLoader  from "~/components/ClientLoader";
import { Map } from "~/components/Map.client";
import { getClientIPAddress } from "remix-utils/build/server/get-client-ip-address";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }:LoaderArgs) => {
  const clientIpAddress = getClientIPAddress(request);
    // Get IP address data from ipify
    const ipRes = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.IPIFY_API_KEY}&$ipAddress=${clientIpAddress}`);
    const ipData = await ipRes.json();
    return json(ipData);
}

export const action = async ({request}: ActionArgs) => {
  // Get search data
  const formData = await request.formData();
  const search = formData.get('search');
  const isIp = search?.toString()?.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
  // Get IP address data from ipify
  const ipRes = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.IPIFY_API_KEY}&${(isIp ? 'ipAddress' : 'domain')}=${search}`);
  const ipData = await ipRes.json();
  return json(ipData);
}

export default function Index() {
  const data = useActionData<typeof action>();
  const initialLoad = useLoaderData<typeof loader>();
  return (
    <main className="h-screen w-full relative">

      <div className="h-full absolute w-full -z-10 flex flex-col">
        <div className="bg-mobile sm:bg-desktop bg-no-repeat bg-cover bg-center w-full h-72" />
        <div id="map"></div>
        <ClientLoader
          fallback={
            <div
              id="skeleton"
              style={{ height: 400, background: "#d1d1d1" }}
            />
          }
        >
          {() => data ? (<Map height={'100%'} position={[data.location.lat,data.location.lng]} />) :
                initialLoad ? (<Map height={'100%'} position={[initialLoad.location.lat,initialLoad.location.lng]} />) :
                        (<Map height={'100%'} position={[51.505, -0.09]} />)}
        </ClientLoader>
      </div>
      <div className="flex flex-col z-[999] w-10/12 mx-auto">
        <h1 className="text-3xl text-white text-center mt-6">IP Address Tracker</h1>
        <Form className="flex flex-row my-6 shadow-md sm:w-[25rem] sm:mx-auto" method='post' reloadDocument>
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            className="w-full h-12 px-4 py-2 rounded-l-lg text-black placeholder:text-sm sm:placeholder:text-base hover:cursor-pointer"
            name="search"
          />
          <button
            type="submit"
            className="h-12 px-4 py-2 rounded-r-lg text-white bg-black shadow-md hover:bg-gray-800"
          >
            <ChevronRightIcon className="h-4 w-4 stroke-[3px]" />
          </button>
        </Form>
        {data ? (<IpTile ip={data.ip} location={data.location.region} timezone={data.location.timezone} isp={data.isp} />):
        initialLoad ? (<IpTile ip={initialLoad.ip} location={initialLoad.location.region} timezone={initialLoad.location.timezone} isp={initialLoad.isp} />):
                (<IpTile ip={'-'} location={'-'} timezone={'-'} isp={'-'} />)}
      </div>
    </main>
  );
}
