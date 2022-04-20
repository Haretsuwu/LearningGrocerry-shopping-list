import { ICategory } from './ICategory';

export interface IRecords {
    category: ICategory;
    description: string;
    id: string;
    superMarkets: string[];
    value: string;
}