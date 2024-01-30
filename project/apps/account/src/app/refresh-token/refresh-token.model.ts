import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Token } from '@project/shared/app/types';

@Schema({
  collection: 'refresh-sessions',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class RefreshTokenModel extends Document implements Token {
  @Prop({ required: true })
  public tokenId: string;

  @Prop( { required: true })
  public userId: string;

  @Prop({ required: true })
  public expiresIn: Date;

  @Prop()
  public createdAt: Date;

  public _id?: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenModel);

RefreshTokenSchema.virtual('id').get(function() {
  return this._id.toString();
});
