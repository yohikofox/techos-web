import Tag from "../model/tag";
import { TagData } from "./dto/tag.dto";

export interface ITagService {
  mapTag(tag: TagData): Tag
}

export default class TagService implements ITagService {
  mapTag(tag: TagData): Tag {
    return {
      label: tag.attributes.label,
      slug: tag.attributes.slug,
      backgroundColor: tag.attributes.background_color,
      color: tag.attributes.color
    } as Tag
  }
}