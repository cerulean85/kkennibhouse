import { NotionAPI } from 'notion-client';
 
export const notion = new NotionAPI();
 
export async function getData(rootPageId: string) {
  return await notion.getPage(rootPageId);
}