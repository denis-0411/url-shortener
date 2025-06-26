import { Select } from './select'
import { Relations } from './relations'
import { Sort } from './sort'

export type FindOptions<T> = {
  select?: Select<T>
  relations?: Relations<T>
  sort?: Sort
}
