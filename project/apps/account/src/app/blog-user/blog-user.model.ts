import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AuthUser } from '@project/shared/app/types';

@Schema({
  collection: 'accounts',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public registrationDate: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public userName: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop()
  public publicationsCount: number;

  @Prop()
  public subscribersCount: number;

  public _id?: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);

BlogUserSchema.virtual('id').get(function() {
  return this._id.toString();
});
