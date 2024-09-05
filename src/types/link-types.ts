export type Link = {
  id: number;
  href: string;
  label: string;
  isContained: boolean;
  links?: number[];
  isOpen?: boolean;
};
