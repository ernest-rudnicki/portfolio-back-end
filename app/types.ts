import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { AnyParamConstructor, BeAnObject } from '@typegoose/typegoose/lib/types';
import { ObjectId } from 'mongodb';

export type Ref<T> = T | ObjectId;
export type UniqueFindCondition<Model> = { [P in keyof DocumentType<Model, BeAnObject>]?: any; };
export type Model<Entity> = ReturnModelType<AnyParamConstructor<Entity>, BeAnObject>;