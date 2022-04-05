import { NotionAPI } from "notion-client";
import type * as notion from "notion-types";

const NOTION_SITE_BASE_URL = process.env.NOTION_SITE_BASE_URL;

if (!NOTION_SITE_BASE_URL) {
  throw new Error("Invalid NOTION_SITE_BASE_URL. Please specify as env");
}

export default class NotionCollectionParser<T> {
  private notionCollection: notion.CollectionInstance;
  private schemaKeys: Set<string>;
  private collectionId: string;
  private collectionPropSchemaMap: {
    [key: string]: notion.CollectionPropertySchema & { keyId: string };
  };
  static notionApi = new NotionAPI();

  constructor(
    collectionId: string,
    notionCollection: notion.CollectionInstance,
    schemaKeys: string[]
  ) {
    this.notionCollection = notionCollection;
    this.schemaKeys = new Set<string>(schemaKeys);
    this.collectionId = collectionId;
    this.collectionPropSchemaMap = {};
    this.parseCollectionPropSchemaMap();
  }

  private parseCollectionPropSchemaMap() {
    const collection =
      this.notionCollection.recordMap.collection?.[this.collectionId];
    if (!collection) {
      return null;
    }
    Object.entries(collection.value.schema).forEach(([key, value]) => {
      this.collectionPropSchemaMap[value.name?.toLocaleLowerCase()] = {
        ...value,
        keyId: key,
      };
    });
  }

  public getListPreview() {
    const blockIds: string[] = (this.notionCollection.result as any)
      ?.reducerResults?.collection_group_results?.blockIds;
    return blockIds
      ?.map((id: string) => this.getBlockPreview(id))
      .filter((block) => block);
  }

  private getBlockPreview(blockId: string): T | null {
    const block = this.notionCollection.recordMap.block[blockId];
    if (!block) {
      return null;
    }

    const resultMap: { [key: string]: any } = {
      id: blockId?.replace(/-/gi, ""),
    };

    this.schemaKeys.forEach((key) => {
      const propSchema = this.collectionPropSchemaMap[key.toLocaleLowerCase()];
      if (!propSchema) {
        return;
      }
      const notionValue = block.value.properties[propSchema.keyId];
      if (!notionValue) {
        resultMap[key] = null;
        return;
      }

      let value: any;
      switch (propSchema.type) {
        case "checkbox": {
          value = !!(notionValue?.[0]?.[0]?.toLocaleLowerCase() === "yes");
          break;
        }
        case "text":
        case "url":
        case "title": {
          value = notionValue?.[0]?.[0];
          break;
        }
        case "date": {
          value = notionValue?.[0]?.[1]?.[0]?.[1]?.start_date;
          break;
        }
        case "multi_select": {
          value = notionValue?.[0]?.[0]?.split(",");
          break;
        }
        default: {
          console.warn("Unhandled notion schema type of ",propSchema, 'with value', notionValue);
        }
      }

      resultMap[key] = value;
    });

    const pageIcon = (block?.value?.format as any)?.page_icon;
    if (pageIcon) {
      if (pageIcon?.startsWith("http")) {
        resultMap[
          "page_icon"
        ] = `${NOTION_SITE_BASE_URL}/image/${encodeURIComponent(
          pageIcon
        )}?table=block&id=${blockId}`;
      } else {
        resultMap["page_emoji"] = pageIcon;
      }
    }
    const pageCover = (block?.value?.format as any)?.page_cover;
    if (pageCover) {
      if (pageCover?.startsWith("http")) {
        resultMap[
          "page_cover"
        ] = `${NOTION_SITE_BASE_URL}/image/${encodeURIComponent(
          pageCover
        )}?table=block&id=${blockId}`;
      } else {
        resultMap["page_cover"] = `${NOTION_SITE_BASE_URL}${pageCover}`;
      }
    }

    return resultMap as T;
  }
}
