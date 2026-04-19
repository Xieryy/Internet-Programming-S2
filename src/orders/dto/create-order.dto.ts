import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateOrderDto {
@IsString()
@IsNotEmpty()
name!: string;

@IsInt()
@Min(1)
qty!: number;
}
