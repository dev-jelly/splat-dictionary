import { useQuery } from "@tanstack/react-query";


type SearchResultProps = {
  query: string;
};

type Result = Record<string, Array<{ en: string, ko: string, ja: string, similarity_score: string }>>


export function SearchResult(props: SearchResultProps) {
  const { isPending, error, data } = useQuery<Result>({
    queryKey: [props.query],
    queryFn: () =>
      fetch("https://zgmpxxotlznrdmdrzuxp.supabase.co/functions/v1/all?q=salmon").then((res) =>
        res.json()
      )
  });

  console.log(isPending, error);

  if (isPending) {
    return <div>'Loading...'</div>;
  }

  if (error) {
    return <div>'An error has occurred: ' + error.message</div>;
  }

  console.log("data", data);

  return (
    <div className={"w-full"}>
      {Object.entries(data).map(([k, v]) => {
        return <Table key={k} keyword={k} translated={v} />;
      })}
    </div>
  );
};


type TableProps = {
  keyword: string,
  translated: Array<{ en: string, ko: string, ja: string, similarity_score: string }>
}
const Table = (props: TableProps) => {
  const { keyword, translated } = props;
  return (<div className="px-4 sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-white">
          {props.keyword}
        </h1>
        <p className="mt-2 text-sm text-gray-300">
          {keyword}에 따른 결과
        </p>
      </div>
    </div>
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className={"bg-gray-500"}>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                한국어
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                영어
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                일본어
              </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
            {translated.map((t, index) => (
              <tr key={index} className={"even:bg-gray-800"}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                  {t.ko}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                  <HighlightText text={t.en} highlight={keyword} />
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                  <HighlightText text={t.en} highlight={keyword} />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>);
};

type HighlightTextProps = {
  text: string,
  highlight: string
}

const HighlightText = ({ text, highlight }: HighlightTextProps) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ?
          <mark className={"bg-amber-600"} key={index}>{part}</mark> :
          part
      )}
    </span>
  );
};
