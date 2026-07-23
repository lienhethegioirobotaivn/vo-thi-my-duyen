import { getPublishedArticlesData } from "./queries";
import { PublishedArticlesClient } from "./PublishedArticlesClient";

export async function PublishedArticles() {
  const data = await getPublishedArticlesData();

  return (
    <PublishedArticlesClient
      titleVi={data.titleVi}
      titleEn={data.titleEn}
      descVi={data.descVi}
      descEn={data.descEn}
      categories={data.categories}
      row1Articles={data.row1Articles}
      row2Articles={data.row2Articles}
    />
  );
}
