import { Searchable } from "./searchable";

type Filterable = Record<string, any> & Searchable;

export default Filterable;