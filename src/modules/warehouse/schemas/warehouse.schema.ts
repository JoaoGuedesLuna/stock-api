import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WarehouseDocument = Warehouse & Document;

@Schema({ timestamps: true, versionKey: false })
export class Warehouse {
  @Prop({ required: true })
  name?: string;

  @Prop({ required: true })
  location?: string;
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
