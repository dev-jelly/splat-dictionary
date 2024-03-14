import Button from "components/atoms/button";
import { useRef, useState } from "react";

import { SearchResult } from "components/SearchResult.tsx";
import { GithubIcon } from "components/icons/GithubIcon.tsx";

function App() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <main>
      <header className="pt-16 z-10 relative max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <a href={"https://octol.ing"}
           className="text-2xl sm:text-4xl leading-none font-bold tracking-tight text-purple-200">
          <span className="text-[gold] opacity-75">스플랫 사전</span> @초코야
          프로젝트
        </a>
        <h1
          className="text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-8 sm:mb-10 text-purple-400 flex items-center">
          Splat Dictionary <a className={"flex items-center h-full p2"}
                              href="https://github.com/dev-jelly/splat-dictionary"><span
          className={"text-white fill-white w-16 h-16 hover:opacity-75 pt-4"}>
          <GithubIcon /></span>
        </a>
        </h1>
        <p className="max-w-screen-lg text-lg sm:text-xl  text-gray-300 font-medium mb-10 sm:mb-11">
          번역하고 싶은 스플래툰의 단어를 입력해주세요.
        </p>
        <div className="absolute top-12 right-12 opacity-10 lg:opacity-50"></div>
      </header>
      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="sm:flex sm:space-x-6 space-y-4 sm:space-y-0 items-center">
          <input
            ref={inputRef}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const query = inputRef?.current?.value;
                setQuery(query || "");
              }
            }}
            className={
              "w-full sm:w-1/2 p-4 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            }
            placeholder="단어를 입력해주세요."
          />
          <Button onClick={() => {
            const query = inputRef?.current?.value;
            setQuery(query || "");
          }}>확인</Button>
        </div>
      </section>
      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        {query && <SearchResult query={query} />}
      </section>
      <footer
        className="pb-16 max-w-screen-lg xl:max-w-screen-xl mx-auto text-center sm:text-right text-gray-400 font-bold">
        <a href="https://github.com/dev-jelly">
          Devjelly @ {new Date().getFullYear()}
        </a>
      </footer>
    </main>
  );
}

export default App;
