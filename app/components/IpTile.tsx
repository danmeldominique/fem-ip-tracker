import DataItem from './DataItem'

type IpTileProps = {
    ip: string;
    location: string;
    timezone: string;
    isp: string;
}

export default function IpTile({ ip, location, timezone, isp }: IpTileProps) {
  return (
    <div className="flex flex-col w-full mx-auto bg-white rounded-lg shadow-lg py-4 space-y-6">
        <DataItem title="IP ADDRESS" value={ip ?? '-'} />
        <DataItem title="LOCATION" value={location ?? '-'} />
        <DataItem title="TIMEZONE" value={timezone ?? '-'} />
        <DataItem title="ISP" value={isp ?? '-'} />
    </div>
    )
}
