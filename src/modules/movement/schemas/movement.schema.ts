import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MovementType } from '../enums/movement-type.enum';

export type MovementDocument = Movement & Document;

@Schema({ timestamps: true, versionKey: false })
export class Movement {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Warehouse', required: true })
  warehouse?: Types.ObjectId;

  @Prop({ required: true, enum: MovementType })
  type?: MovementType;

  @Prop({ required: true, min: 1 })
  quantity?: number;

  @Prop({ required: false })
  note?: string;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);
