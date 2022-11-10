// External dependencies
import { ObjectId } from 'mongodb'



export interface Writing {
  _id: ObjectId
  slug: string;
  content: string;
  likes: number;
  comments: ObjectId[]
}

// Class Implementation

/* export class Writing { */
/*   constructor( */
/*     public title: string,  */
/*     public slug: string,  */
/*     public path: string,  */
/*     public dir: string,  */
/*     public like_count: number,  */
/*     public id?: ObjectId */
/*   ) { } */
/* } */
