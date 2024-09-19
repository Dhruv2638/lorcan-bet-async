export class CreateProductDto {
  name: string;
  description: string;
  price: number;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
}
