export interface Section {
  item_id: string;
  title: string;
  url: string;
}

export interface SectionApiResponse {
  section: Section;
}
