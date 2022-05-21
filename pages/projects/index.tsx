import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { NotionRenderer } from 'react-notion-x';
import DefaultLayout from '../../components/default-layout';
import { getProjectPageRecordMap } from '../../lib/notion-api-client';
import type * as notion from 'notion-types';


//@ts-ignore
const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)

//@ts-ignore
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)

export const defaultMapPageUrl = (recordMap: notion.ExtendedRecordMap) => (pageId: string) => {

  if (!recordMap) {
    return '/';
  }

  const pageData = recordMap.block?.[pageId]?.value;
  const pageParentTable = pageData?.parent_id;
  const schemaMap = recordMap.collection?.[pageParentTable]?.value?.schema;
  const propEntry = Object.entries(schemaMap || {}).find(([key, value]) => value.name?.toLocaleLowerCase() === 'url');
  const propKey = propEntry?.[0];
  const url = pageData?.properties[propKey || '']?.[0]?.[0];
  if (url) {
    return url;
  } 
  return `/`;
}

const ProjectIndex: NextPage<ProjectIndexProps> = ({recordMap}) => {
  return <DefaultLayout>
      {recordMap && <NotionRenderer 
        recordMap={recordMap} 
        fullPage={true} 
        darkMode={true} 
        disableHeader={true}
        components={{
          nextImage: Image,
          nextLink: Link,
          Code,
          Collection,
        }}
        mapPageUrl={defaultMapPageUrl(recordMap)}
        // showTableOfContents={true}
        // minTableOfContentsItems={1}
        previewImages={!!recordMap.preview_images}
        showCollectionViewDropdown={false}
        />}
  </DefaultLayout>
}

export default ProjectIndex;

export const getStaticProps: GetStaticProps = async () => {
  const projectPage = await getProjectPageRecordMap();
  if (!projectPage) {
    console.error('Unexpected error getting project page');
    return {
      notFound: true,
    }
  }

  return {
    props: {
      recordMap: projectPage,
    },
    revalidate: 60,
  };
};

interface ProjectIndexProps {
  recordMap: notion.ExtendedRecordMap;
}