import { NotionAPI } from "notion-client";
import NotionCollectionParser from "./notion-collection-parser";

const NOTION_NOTES_COLLECTION_ID = process.env.NOTION_NOTES_COLLECTION_ID;
const NOTION_NOTES_COLLECTION_VIEW_ID =
  process.env.NOTION_NOTES_COLLECTION_VIEW_ID;
const NOTION_PROJECT_PAGE_ID = process.env.NOTION_PROJECT_PAGE_ID;
const NOTION_FEATURED_PROJECT_COLLECTION_ID = process.env.NOTION_FEATURED_PROJECT_COLLECTION_ID;
const NOTION_FEATURED_PROJECT_COLLECTION_VIEW_ID = process.env.NOTION_FEATURED_PROJECT_COLLECTION_VIEW_ID;



export const getMyNotionNoteListData = async () => {
  if (!NOTION_NOTES_COLLECTION_ID || !NOTION_NOTES_COLLECTION_VIEW_ID || !NOTION_PROJECT_PAGE_ID) {
    console.error(
      "Invalid NOTION_NOTES_COLLECTION_ID, or NOTION_NOTES_COLLECTION_ID"
    );
    return null;
  }

  const notionCollection =
    await NotionCollectionParser.notionApi.getCollectionData(
      NOTION_NOTES_COLLECTION_ID,
      NOTION_NOTES_COLLECTION_VIEW_ID,
      null,
      {
        limit: 100000,
      }
    );

  const notionCollectionParser = new NotionCollectionParser<NoteListSchema>(
    NOTION_NOTES_COLLECTION_ID,
    notionCollection,
    noteListSchema as any
  );

  return notionCollectionParser.getListPreview();
};

const noteListSchema = [
  "name",
  "published",
  "archived",
  "previewDesc",
  "publishedDate",
  "tags",
] as const;

export type NoteListSchema = {
  id: string;
  name?: string;
  previewDesc?: string;
  published?: string;
  archived?: boolean;
  publishedDate?: string;
  tags?: string[];
  page_cover?: string | undefined;
  page_icon?: string | undefined;
  page_emoji?: string | undefined;
};


const notionApi = new NotionAPI();

export const getProjectPageRecordMap = async () => {
  try {
    if (!NOTION_PROJECT_PAGE_ID) {
      throw new Error(
        "Invalid NOTION_PROJECT_PAGE_ID"
      );
    }
    const recordMap = await notionApi.getPage(NOTION_PROJECT_PAGE_ID);
    return recordMap
  } catch (e) {
    console.error('Getting notion project page id error', e);
    return null;
  }
}

export const getFeaturedProjectListSchema = async () => {
  if (!NOTION_FEATURED_PROJECT_COLLECTION_ID || !NOTION_FEATURED_PROJECT_COLLECTION_VIEW_ID) {
    console.error(
      "Invalid NOTION_FEATURED_PROJECT_COLLECTION_ID, or NOTION_FEATURED_PROJECT_COLLECTION_VIEW_ID"
    );
    return null;
  }

  const notionCollection =
    await NotionCollectionParser.notionApi.getCollectionData(
      NOTION_FEATURED_PROJECT_COLLECTION_ID,
      NOTION_FEATURED_PROJECT_COLLECTION_VIEW_ID,
      null,
      {
        limit: 2,
      }
    );

  const notionCollectionParser = new NotionCollectionParser<ProjectListSchema>(
    NOTION_FEATURED_PROJECT_COLLECTION_ID,
    notionCollection,
    projectListSchema as any
  );

  return notionCollectionParser.getListPreview();
}

const projectListSchema = [
  "name",
  "tags",
  "url",
  "previewDesc",
] as const;

export type ProjectListSchema = {
  id: string;
  name?: string;
  tags?: string[];
  url?: string;
  previewDesc?: string;
  page_cover?: string | undefined;
  page_icon?: string | undefined;
  page_emoji?: string | undefined;
};