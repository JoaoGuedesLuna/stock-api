import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StockDocument = Stock & Document;

@Schema({ timestamps: true, versionKey: false })
export class Stock {
  _id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Warehouse', required: true })
  warehouse?: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  quantity?: number;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
