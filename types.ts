export type ItemCondition = 'New with tags' | 'Excellent' | 'Good' | 'Fair';

export type Item = {
  id: number;
  title: string;
  description: string;
  images: string[];
  category: string;
  type: string;
  size: string;
  condition: ItemCondition;
  tags: string[];
  uploader: {
    name: string;
    avatar: string;
  };
  status: 'Available' | 'Swapped' | 'Pending Approval';
  featured?: boolean;
  points: number;
};

export type Swap = {
  id: number;
  itemOffered: {
    id: number;
    title: string;
    image: string;
  };
  itemRequested: {
    id: number;
    title: string;
    image: string;
  };
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
  date: string;
};
