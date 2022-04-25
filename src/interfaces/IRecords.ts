import { ICategory } from './ICategory';

export interface IRecords {
    description: string;
    value: string;
    category: ICategory;
    id: string;
    superMarkets: string[];
    img: string;
}