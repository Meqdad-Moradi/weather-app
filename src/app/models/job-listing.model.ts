export interface IJobListing {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

export interface IJobListingDetailInfo {
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  about: string;
}
