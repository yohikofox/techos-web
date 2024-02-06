import { Searchable } from "./searchable";

type Filterable = Record<string, unknown> & Searchable;

export default Filterable;
