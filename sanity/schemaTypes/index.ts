import { type SchemaTypeDefinition } from 'sanity';
import { courseType } from './courseType';
import { moduleType } from './moduleType';
import { lessonType } from './lessonType';
import { authorType } from './authorType';
import { blockContent } from './blockContent';
import { studentType } from './studentType';
import { enrollmentType } from './enrollmentType';
import { categoryType } from './categoryType';
import { lessonCompletionType } from './lessonCompletionType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    courseType,
    moduleType,
    lessonType,
    authorType,
    blockContent,
    studentType,
    enrollmentType,
    categoryType,
    lessonCompletionType,
  ],
};

export * from './courseType';
export * from './moduleType';
export * from './lessonType';
export * from './authorType';
export * from './studentType';
export * from './enrollmentType';
export * from './categoryType';
export * from './lessonCompletionType';
