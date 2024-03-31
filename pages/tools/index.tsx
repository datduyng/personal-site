import { NextPage } from 'next';
import Card from '../../components/stateless/card';
import Link from 'next/link';
import DefaultLayout from '../../components/default-layout';
import cn from "classnames";
import { useQueryState } from 'nuqs';

type Tool = {
  name: string;
  description: string;
  link: string;
};
const tools: Tool[] = [
  {
    name: "URL Shortener",
    description: "Shorten your URLs using this tool",
    link: "/tools/url-shortener",
  },
  {
    name: "Universal OCR",
    description: "Extract text from images, PDFs, and more",
    link: "/tools/ocr",
  }
]

const ToolCard = ({ tool }: {
  tool: Tool;
}) => {
  return (<Card
    className={cn(
      "flex flex-col px-5 py-6"
    )}
  >
    <h3 className="text-2xl font-bold">{tool.name}</h3>
    <p className="text-secondary">{tool.description}</p>
    <Link href={tool.link} className='py-2 mt-1 text-accent'>
      Go to Tool
    </Link>
  </Card>)
}

const ToolsListPage: NextPage = () => {
  const [searchQuery, setSearchQuery] = useQueryState('q');

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center py-4 mx-2">
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery || ''}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='px-3 py-2 w-full rounded-md border text-md bg-main ring-secondary-reallight placeholder:text-secondary-light border-secondary-reallight active:border-secondary-light'
        // className="flex px-3 py-2 w-full h-10 text-sm rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery(null)} className="px-4 py-2 ml-4 font-semibold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none">
            Clear
          </button>
        )}
      </div>
      <div className='flex flex-col gap-4 mx-2'>
        {tools
          .filter((tool) =>
            searchQuery
              ? tool.name.toLowerCase().includes(searchQuery.toLowerCase())
              : true
          )
          .map((tool, index) => (
            <ToolCard key={tool.link} tool={tool} />
          ))}
      </div>
    </DefaultLayout>
  );
};
export default ToolsListPage;