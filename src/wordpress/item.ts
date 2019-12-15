import WPAPI from "wpapi";

export interface Item {
  id: number;
  slug?: string;
}

function getRequestTypeByType(api: WPAPI, type: string) {
  switch (type) {
    case "posts":
      return api.posts();
    case "categories":
      return api.categories();
    case "tags":
      return api.tags();
    case "pages":
      return api.pages();
    case "users":
      return api.users();
    default:
      throw new Error(`Unrecognized type: ${type}`);
  }
}

export async function getItem(
  api: WPAPI,
  type: string,
  id: number
): Promise<Item> {
  return await getRequestTypeByType(api, type).id(id);
}

export async function listItems(
  api: WPAPI,
  type: string,
  page: number
): Promise<Item[]> {
  try {
    return await getRequestTypeByType(api, type).page(page);
  } catch (e) {
    if (e.code === "rest_post_invalid_page_number") {
      // Last page probably.
      return [];
    } else {
      // Some other error.
      throw e;
    }
  }
}
